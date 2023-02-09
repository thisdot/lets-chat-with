const { v4: uuidv4 } = require('uuid');
const { documentClient } = require('../../utils/aws-s3-client.js');

const {
  CANDIDATE_TABLE_NAME,
  CANDIDATE_DESIRED_IDENTIFIER_TABLE_NAME,
  CANDIDATE_INTEREST_TABLE_NAME,
  MATCH_INTEREST_TABLE_NAME,
  MATCH_DESIRED_IDENTIFIER_TABLE_NAME,
  MATCH_TABLE_NAME,
  CHAT_THREAD_TABLE_NAME,
} = process.env;

const CANDIDATE_TYPE = {
  LIKE: 'LIKE',
  DISLIKE: 'DISLIKE',
  UNDECIDED: 'UNDECIDED',
};

const MAX_ITEMS_IN_BATCH_WRITE = 25;

async function handler(event) {
  console.log('Handling new event', JSON.stringify(event));

  const input = {
    interests: event.arguments.input.interests,
    desiredIdentifiers: event.arguments.input.desiredIdentifiers,
    ...event.arguments.input,
  };

  const {
    id: candidateId,
    interests: updatedInterestIds,
    desiredIdentifiers: updatedIdentifierIds,
    ...updatedCandidateFields
  } = input;

  // Get event ID and owner from the edited attendee
  // These are not mandatory on the API, but we need them if we will insert new records to interests or desiredIdentifiers
  const { eventId, owner, attendeeId, ownerAttendeeId } = await getCandidate(candidateId);

  const pairCandidate = await getPairCandidate({ attendeeId, ownerAttendeeId, eventId });

  let interestIdsToAdd = [];
  if (updatedInterestIds) {
    const currentInterests = await queryRelatedTableByCandidate(
      CANDIDATE_INTEREST_TABLE_NAME,
      candidateId
    );
    const currentInterestIds = currentInterests.map((interest) => interest.interestId);

    interestIdsToAdd = updatedInterestIds.filter(
      (interestId) => !currentInterestIds.includes(interestId)
    );
  }

  let desiredIdentifierIdsToAdd = [];
  if (updatedIdentifierIds) {
    const currentIdentifiers = await queryRelatedTableByCandidate(
      CANDIDATE_DESIRED_IDENTIFIER_TABLE_NAME,
      candidateId
    );
    const currentIdentifierIds = currentIdentifiers.map(
      (desiredIdentifier) => desiredIdentifier.desiredIdentifierId
    );

    desiredIdentifierIdsToAdd = updatedIdentifierIds.filter(
      (desiredIdentifierId) => !currentIdentifierIds.includes(desiredIdentifierId)
    );
  }

  const transacItems = [
    ...interestIdsToAdd.map((interestId) =>
      createPutItem(
        {
          candidateId,
          interestId,
          owner,
          eventId,
          __typename: 'CandidateInterest',
        },
        CANDIDATE_INTEREST_TABLE_NAME
      )
    ),
    ...desiredIdentifierIdsToAdd.map((desiredIdentifierId) =>
      createPutItem(
        {
          candidateId,
          desiredIdentifierId,
          owner,
          eventId,
          __typename: 'CandidateDesiredIdentifier',
        },
        CANDIDATE_DESIRED_IDENTIFIER_TABLE_NAME
      )
    ),
  ];

  if (Object.keys(updatedCandidateFields).length > 0) {
    transacItems.push(
      createCandidateUpdateItem(candidateId, updatedCandidateFields, CANDIDATE_TABLE_NAME)
    );
  }

  if (
    updatedCandidateFields.candidateType === CANDIDATE_TYPE.LIKE &&
    pairCandidate?.candidateType === CANDIDATE_TYPE.LIKE
  ) {
    const matchId = uuidv4();
    // generate matches
    transacItems.push(
      createPutItem(
        {
          id: matchId,
          eventId,
          attendee1Id: ownerAttendeeId,
          attendee2Id: attendeeId,
          owners: [owner, pairCandidate.owner],
        },
        MATCH_TABLE_NAME
      )
    );

    const attendee2Interests = await queryRelatedTableByCandidate(
      CANDIDATE_INTEREST_TABLE_NAME,
      pairCandidate.id
    );

    const attendee2Identifiers = await queryRelatedTableByCandidate(
      CANDIDATE_DESIRED_IDENTIFIER_TABLE_NAME,
      pairCandidate.id
    );

    attendee2Interests.forEach((interest) => {
      transacItems.push(
        createPutItem(
          {
            __typename: 'MatchInterest',
            matchId,
            interestId: interest.interestId,
            eventId,
            attendeeId: ownerAttendeeId,
            owner,
          },
          MATCH_INTEREST_TABLE_NAME
        )
      );
    });

    attendee2Identifiers.forEach((identifier) => {
      transacItems.push(
        createPutItem(
          {
            __typename: 'MatchIdentifier',
            matchId,
            desiredIdentifierId: identifier.desiredIdentifierId,
            eventId,
            attendeeId: ownerAttendeeId,
            owner,
          },
          MATCH_DESIRED_IDENTIFIER_TABLE_NAME
        )
      );
    });

    interestIdsToAdd.forEach((interestId) => {
      transacItems.push(
        createPutItem(
          {
            __typename: 'MatchInterest',
            matchId,
            interestId,
            eventId,
            attendeeId,
            owner,
          },
          MATCH_INTEREST_TABLE_NAME
        )
      );
    });

    desiredIdentifierIdsToAdd.forEach((desiredIdentifierId) => {
      transacItems.push(
        createPutItem(
          {
            __typename: 'MatchIdentifier',
            matchId,
            desiredIdentifierId: desiredIdentifierId,
            eventId,
            attendeeId,
            owner,
          },
          MATCH_DESIRED_IDENTIFIER_TABLE_NAME
        )
      );
    });

    transacItems.push(
      createPutItem(
        {
          __typename: 'ChatThread',
          matchId,
          eventId,
        },
        CHAT_THREAD_TABLE_NAME
      )
    );
  }

  console.log('Writing to database', JSON.stringify(transacItems));

  await Promise.all(
    chunkArray(transacItems, MAX_ITEMS_IN_BATCH_WRITE).map((transacItemBatch) =>
      documentClient()
        .transactWrite({ TransactItems: transacItemBatch }, (err, data) => {
          if (err) {
            console.error(err);
          } else {
            console.log(JSON.stringify(data), new Date().toISOString());
          }
        })
        .promise()
    )
  );

  // It would be very hard to allow returning of queried items, since we it becomes non-trivial to implement for nested objects
  // Rather have the client use the built-in getCandidate right after updating
  return { id: candidateId, attendeeId };
}

async function getCandidate(candidateId) {
  result = await documentClient()
    .get({
      TableName: CANDIDATE_TABLE_NAME,
      Key: {
        id: candidateId,
      },
    })
    .promise();

  return result.Item;
}

async function queryRelatedTableByCandidate(tableName, candidateId) {
  const result = await documentClient()
    .query({
      TableName: tableName,
      ExpressionAttributeValues: {
        ':candidateId': candidateId,
      },
      KeyConditionExpression: 'candidateId = :candidateId',
      IndexName: 'byCandidate',
    })
    .promise();

  return result.Items;
}

function createDeleteItem(object, tableName) {
  return {
    Delete: {
      Key: {
        id: object.id,
      },
      TableName: tableName,
    },
  };
}

function createPutItem(object, tableName) {
  const now = new Date();

  return {
    Put: {
      Item: {
        id: uuidv4(),
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        ...object,
      },
      TableName: tableName,
    },
  };
}

function createCandidateUpdateItem(candidateId, attendeeFields, tableName) {
  return {
    Update: {
      Key: {
        id: candidateId,
      },
      ExpressionAttributeValues: generateAttributeValues(attendeeFields),
      UpdateExpression: `SET ${generateSetExpressions(attendeeFields)}`,
      TableName: tableName,
    },
  };
}

function generateSetExpressions(object) {
  return Object.keys(object)
    .map((key) => `${key} = :${key}`)
    .join(', ');
}

function generateAttributeValues(object) {
  return Object.entries(object).reduce((attributeValues, [key, value]) => {
    attributeValues[`:${key}`] = value;
    return attributeValues;
  }, {});
}

function chunkArray(myArray, chunkSize) {
  const results = [];

  while (myArray.length) {
    results.push(myArray.splice(0, chunkSize));
  }

  return results;
}

async function getPairCandidate({ attendeeId, ownerAttendeeId, eventId }) {
  return await fetchPairCandidate({
    attendeeId: ownerAttendeeId,
    ownerAttendeeId: attendeeId,
    eventId,
  });
}

async function fetchPairCandidate({ ownerAttendeeId, attendeeId, eventId }) {
  const searchParams = {
    ExpressionAttributeNames: {
      '#attendeeId': 'attendeeId',
      '#ownerAttendeeId': 'ownerAttendeeId',
      '#eventId': 'eventId',
    },
    ExpressionAttributeValues: {
      ':attendeeId': attendeeId,
      ':ownerAttendeeId': ownerAttendeeId,
      ':eventId': eventId,
    },
    KeyConditionExpression: '#attendeeId = :attendeeId and #ownerAttendeeId = :ownerAttendeeId',
    FilterExpression: '#eventId = :eventId',
    IndexName: 'byAttendees',
    TableName: CANDIDATE_TABLE_NAME,
  };
  const { Items } = await documentClient().query(searchParams).promise();
  return Items.length ? Items[0] : null;
}

exports.handler = handler;
