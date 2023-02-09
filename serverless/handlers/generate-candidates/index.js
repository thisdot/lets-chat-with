const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const { documentClient } = require('../../utils/aws-s3-client.js');

const MAX_ITEMS_IN_BATCH_WRITE = 25;

const INTERESTS_WEIGHT = 10;
const LOOKING_FOR_WEIGHT = 50;
const CANDIDATE_THRESHOLD = 60;

const {
  ATTENDEE_TABLE_NAME,
  CANDIDATE_TABLE_NAME,
  ATTENDEE_DESIRED_IDENTIFIER_TABLE_NAME,
  ATTENDEE_INTEREST_TABLE_NAME,
  ATTENDEE_OWN_IDENTIFIER_TABLE_NAME,
} = process.env;

async function handler(event) {
  console.log('Handling new event', JSON.stringify(event));

  try {
    await Promise.all(
      Object.entries(convertRecordsToRowsGroupedByEvent(event.Records)).map(
        ([eventId, newOrModifiedRows]) => handleUpdatedAttendees(eventId, newOrModifiedRows)
      )
    );
  } catch (err) {
    console.error(JSON.stringify(err, null, 2));
  }
  console.log('Successfully processed DynamoDB record');
}

/**
 * Group inserted/modified attendee rows by eventId to handle records from the same event in bulk.
 */
function convertRecordsToRowsGroupedByEvent(records) {
  const test = records
    .filter((record) => record.eventName === 'INSERT' || record.eventName === 'MODIFY')
    .map((record) => ({
      row: AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage),
      operation: record.eventName,
    }))
    .reduce((groups, newOrModifiedRow) => {
      groups[newOrModifiedRow.row.eventId] = groups[newOrModifiedRow.row.eventId] || [];
      groups[newOrModifiedRow.row.eventId].push(newOrModifiedRow);
      return groups;
    }, {});

  console.log('records', JSON.stringify(test));
  return test;
}

async function handleUpdatedAttendees(eventId, updatedRows) {
  console.log(`Handling ${updatedRows.length} rows for event: ${eventId}`);

  const allEventAttendees = await getEventAttendees(eventId);
  const allEventCandidates = await getEventCandidates(eventId);

  const candidateRequests = createCandidateRequests(
    eventId,
    updatedRows,
    allEventAttendees,
    allEventCandidates
  );

  console.log('Created candidate requests', JSON.stringify(candidateRequests));

  await insertOrDeleteCandidates(candidateRequests);
}

function separateUpdatedFromOtherAttendees(eventAttendees, updatedRows) {
  const modifiedRowIds = updatedRows.map((row) => row.row.id);
  const updatedAttendees = [];
  const otherAttendees = [];

  for (let eventAttendee of eventAttendees) {
    if (modifiedRowIds.includes(eventAttendee.id)) {
      updatedAttendees.push(eventAttendee);
    } else {
      otherAttendees.push(eventAttendee);
    }
  }

  return [updatedAttendees, otherAttendees];
}

function findCandidate(ownerAttendeeId, candidateAttendeeId, allEventCandidates) {
  return allEventCandidates.find(
    (candidate) =>
      candidate.ownerAttendeeId === ownerAttendeeId && candidate.attendeeId === candidateAttendeeId
  );
}

function createCandidateRequestFromAttendees(ownerAttendee, otherAttendee, allEventCandidates) {
  const score = calculateMatchScore(ownerAttendee, otherAttendee);
  const existingCandidate = findCandidate(ownerAttendee.id, otherAttendee.id, allEventCandidates);

  let candidateRequest = null;
  if (score >= CANDIDATE_THRESHOLD && !existingCandidate) {
    // Creating a new candidate
    const now = new Date();
    candidateRequest = {
      PutRequest: {
        Item: {
          id: uuidv4(),
          owner: ownerAttendee.owner,
          ownerAttendeeId: ownerAttendee.id,
          eventId: ownerAttendee.eventId,
          attendeeId: otherAttendee.id,
          candidateType: 'UNDECIDED',
          createdAt: now.toISOString(),
          updatedAt: now.toISOString(),
          matchScore: score,
          __typename: 'Candidate',
        },
      },
    };
  } else if (existingCandidate && existingCandidate.candidateType === 'UNDECIDED') {
    // A previous candidate exists for this attendee and is no longer a match, so we have to delete it
    candidateRequest = {
      DeleteRequest: {
        Key: { id: existingCandidate.id },
      },
    };
  }

  return candidateRequest;
}

function createCandidateRequests(eventId, updatedRows, allEventAttendees, allEventCandidates) {
  const [updatedAttendees, otherAttendees] = separateUpdatedFromOtherAttendees(
    allEventAttendees,
    updatedRows
  );

  const candidateRequests = [];

  for (const updatedAttendee of updatedAttendees) {
    // for otherAttendees we calculate score from a newAttendee to otherAttendee and vice-versa
    // this way we ensure that both attendees can see each other
    for (const otherAttendee of otherAttendees) {
      const candidateForUpdatedAttendee = createCandidateRequestFromAttendees(
        updatedAttendee,
        otherAttendee,
        allEventCandidates
      );
      if (candidateForUpdatedAttendee) {
        candidateRequests.push(candidateForUpdatedAttendee);
      }
      const candidateForOtherAttendee = createCandidateRequestFromAttendees(
        otherAttendee,
        updatedAttendee,
        allEventCandidates
      );
      if (candidateForOtherAttendee) {
        candidateRequests.push(candidateForOtherAttendee);
      }
    }

    for (const otherUpdatedAttendee of updatedAttendees) {
      if (otherUpdatedAttendee.id !== updatedAttendee.id) {
        // to create candidates between new attendees we only calculate score from new attendee to other new attendees
        // the reverse score will be calculated in the other iteration of the top level loop in this function
        const candidateForOtherUpdatedAttendee = createCandidateRequestFromAttendees(
          otherUpdatedAttendee,
          updatedAttendee,
          allEventCandidates
        );
        if (candidateForOtherUpdatedAttendee) {
          candidateRequests.push(candidateForOtherUpdatedAttendee);
        }
      }
    }
  }

  return candidateRequests;
}

async function insertOrDeleteCandidates(candidates) {
  await writeInChunks(candidates, CANDIDATE_TABLE_NAME);

  console.log(`Successfully wrote ${candidates.length} new candidates`, candidates);
}

async function getEventCandidates(eventId) {
  const searchParams = {
    ExpressionAttributeNames: {
      '#eventId': 'eventId',
    },
    ExpressionAttributeValues: {
      ':eventId': eventId,
    },
    KeyConditionExpression: '#eventId = :eventId',
    IndexName: 'byEventId',
    TableName: CANDIDATE_TABLE_NAME,
  };

  const { Items } = await documentClient().query(searchParams).promise();

  return Items.length ? Items : [];
}

async function getEventAttendees(eventId) {
  const searchParams = {
    ExpressionAttributeNames: {
      '#eventId': 'eventId',
    },
    ExpressionAttributeValues: {
      ':eventId': eventId,
    },
    KeyConditionExpression: '#eventId = :eventId',
    IndexName: 'byEventId',
    TableName: ATTENDEE_TABLE_NAME,
  };

  const { Items } = await documentClient().query(searchParams).promise();

  const attendeesToInterests = await getAdditionalAttendeeData(
    eventId,
    ATTENDEE_INTEREST_TABLE_NAME,
    'interestId'
  );

  const attendeesToOwnIdentifiers = await getAdditionalAttendeeData(
    eventId,
    ATTENDEE_OWN_IDENTIFIER_TABLE_NAME,
    'identifierId'
  );
  const attendeesToDesiredIdentifiers = await getAdditionalAttendeeData(
    eventId,
    ATTENDEE_DESIRED_IDENTIFIER_TABLE_NAME,
    'identifierId'
  );

  return enrichAttendees(
    Items,
    attendeesToInterests,
    attendeesToOwnIdentifiers,
    attendeesToDesiredIdentifiers
  );
}

function enrichAttendees(attendees, interests, ownIdentifiers, desiredIdentifiers) {
  for (let attendee of attendees) {
    attendee.interests = interests[attendee.id];
    attendee.ownIdentifiers = ownIdentifiers[attendee.id];
    attendee.desiredIdentifiers = desiredIdentifiers[attendee.id];
  }

  return attendees;
}

/**
 * This function gets additional attendee data from other tables, such as interests, own identifiers or desired identifiers.
 */
async function getAdditionalAttendeeData(eventId, tableName, tableFieldName) {
  const { Items } = await documentClient()
    .query({
      TableName: tableName,
      ExpressionAttributeValues: {
        ':eventId': eventId,
      },
      KeyConditionExpression: 'eventId = :eventId',
      IndexName: 'byEvent',
    })
    .promise();

  return Items.reduce((attendeeData, item) => {
    attendeeData[item.attendeeId] = attendeeData[item.attendeeId] || [];
    attendeeData[item.attendeeId].push(item[tableFieldName]);
    return attendeeData;
  }, {});
}

function calculateMatchScore(newAttendee, otherAttendee) {
  return (
    countCommon(newAttendee.interests, otherAttendee.interests) * INTERESTS_WEIGHT +
    countCommon(newAttendee.desiredIdentifiers, otherAttendee.ownIdentifiers) * LOOKING_FOR_WEIGHT
  );
}

function countCommon(_arr1, _arr2) {
  const arr1 = _arr1 || [],
    arr2 = _arr2 || [];
  const set = new Set(arr1);
  return arr2.reduce((acc, el) => acc + (set.has(el) ? 1 : 0), 0);
}

async function writeInChunks(writeRequests, table) {
  return await Promise.all(
    chunkArray(writeRequests, MAX_ITEMS_IN_BATCH_WRITE)
      .map((items) => ({
        RequestItems: {
          [table]: items,
        },
      }))
      .map((batchWriteParams) =>
        documentClient()
          .batchWrite(batchWriteParams, (err, data) => {
            if (err) {
              console.error(err);
            } else {
              console.log(JSON.stringify(data), new Date().toISOString());
            }
          })
          .promise()
      )
  );
}

function chunkArray(originalArray, chunkSize) {
  const results = [];
  const processingArray = [...originalArray];

  while (processingArray.length) {
    results.push(processingArray.splice(0, chunkSize));
  }

  return results;
}

exports.handler = handler;
exports.createCandidateRequests = createCandidateRequests;
