const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const { documentClient } = require('../../utils/aws-s3-client.js');

const {
  ATTENDEE_TABLE_NAME,
  ATTENDEE_DESIRED_IDENTIFIER_TABLE_NAME,
  ATTENDEE_OWN_IDENTIFIER_TABLE_NAME,
  ATTENDEE_INTEREST_TABLE_NAME,
} = process.env;

const MAX_ITEMS_IN_BATCH_WRITE = 25;

async function handler(event) {
  console.log('Handling new event', JSON.stringify(event));

  const input = {
    interests: event.arguments.input.interests,
    desiredIdentifiers: event.arguments.input.desiredIdentifiers,
    ownIdentifiers: event.arguments.input.ownIdentifiers,
    ...event.arguments.input,
  };

  const {
    id: attendeeId,
    interests: updatedInterestIds,
    desiredIdentifiers: updatedDesiredIdentifierIds,
    ownIdentifiers: updatedOwnIdentifierIds,
    ...updatedAttendeeFields
  } = input;

  let interestIdsToAdd = [];
  let interestsToRemove = [];
  if (updatedInterestIds) {
    const currentInterests = await queryRelatedTableByAttendee(
      ATTENDEE_INTEREST_TABLE_NAME,
      attendeeId
    );
    const currentInterestIds = currentInterests.map((interest) => interest.interestId);

    interestIdsToAdd = updatedInterestIds.filter(
      (interestId) => !currentInterestIds.includes(interestId)
    );
    interestsToRemove = currentInterests.filter(
      (interest) => !updatedInterestIds.includes(interest.interestId)
    );
  }

  let ownIdentifierIdsToAdd = [];
  let ownIdentifiersToRemove = [];
  if (updatedOwnIdentifierIds) {
    const currentOwnIdentifiers = await queryRelatedTableByAttendee(
      ATTENDEE_OWN_IDENTIFIER_TABLE_NAME,
      attendeeId
    );
    const currentOwnIdentifierIds = currentOwnIdentifiers.map(
      (identifier) => identifier.identifierId
    );

    ownIdentifierIdsToAdd = updatedOwnIdentifierIds.filter(
      (identifierId) => !currentOwnIdentifierIds.includes(identifierId)
    );
    ownIdentifiersToRemove = currentOwnIdentifiers.filter(
      (ownIdentifier) => !updatedOwnIdentifierIds.includes(ownIdentifier.identifierId)
    );
  }

  let desiredIdentifierIdsToAdd = [];
  let desiredIdentifiersToRemove = [];
  if (updatedDesiredIdentifierIds) {
    const currentDesiredIdentifiers = await queryRelatedTableByAttendee(
      ATTENDEE_DESIRED_IDENTIFIER_TABLE_NAME,
      attendeeId
    );
    const currentDesiredIdentifierIds = currentDesiredIdentifiers.map(
      (identifier) => identifier.identifierId
    );

    desiredIdentifierIdsToAdd = updatedDesiredIdentifierIds.filter(
      (identifierId) => !currentDesiredIdentifierIds.includes(identifierId)
    );
    desiredIdentifiersToRemove = currentDesiredIdentifiers.filter(
      (desiredIdentifier) => !updatedDesiredIdentifierIds.includes(desiredIdentifier.identifierId)
    );
  }

  // Get event ID and owner from the edited attendee
  // These are not mandatory on the API, but we need them if we will insert new records to interests or identifiers
  const { eventId, owner } = await getAttendee(attendeeId);

  const transacItems = [
    ...interestIdsToAdd.map((interestId) =>
      createPutItem(
        {
          attendeeId,
          interestId,
          owner,
          eventId,
          __typename: 'AttendeeInterest',
        },
        ATTENDEE_INTEREST_TABLE_NAME
      )
    ),
    ...ownIdentifierIdsToAdd.map((identifierId) =>
      createPutItem(
        {
          attendeeId,
          identifierId,
          owner,
          eventId,
          __typename: 'AttendeeOwnIdentifier',
        },
        ATTENDEE_OWN_IDENTIFIER_TABLE_NAME
      )
    ),
    ...desiredIdentifierIdsToAdd.map((identifierId) =>
      createPutItem(
        {
          attendeeId,
          identifierId,
          owner,
          eventId,
          __typename: 'AttendeeDesiredIdentifier',
        },
        ATTENDEE_DESIRED_IDENTIFIER_TABLE_NAME
      )
    ),
    ...interestsToRemove.map((interest) =>
      createDeleteItem(interest, ATTENDEE_INTEREST_TABLE_NAME)
    ),
    ...ownIdentifiersToRemove.map((identifier) =>
      createDeleteItem(identifier, ATTENDEE_OWN_IDENTIFIER_TABLE_NAME)
    ),
    ...desiredIdentifiersToRemove.map((identifier) =>
      createDeleteItem(identifier, ATTENDEE_DESIRED_IDENTIFIER_TABLE_NAME)
    ),
  ];

  if (Object.keys(updatedAttendeeFields).length > 0) {
    transacItems.push(
      createAttendeeUpdateItem(attendeeId, updatedAttendeeFields, ATTENDEE_TABLE_NAME)
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
  // Rather have the client use the built-in getAttendee right after updating
  return { id: attendeeId };
}

async function getAttendee(attendeeId) {
  result = await documentClient()
    .get({
      TableName: ATTENDEE_TABLE_NAME,
      Key: {
        id: attendeeId,
      },
    })
    .promise();

  return result.Item;
}

async function queryRelatedTableByAttendee(tableName, attendeeId) {
  const result = await documentClient()
    .query({
      TableName: tableName,
      ExpressionAttributeValues: {
        ':attendeeId': attendeeId,
      },
      KeyConditionExpression: 'attendeeId = :attendeeId',
      IndexName: 'byAttendee',
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

function createAttendeeUpdateItem(attendeeId, attendeeFields, tableName) {
  return {
    Update: {
      Key: {
        id: attendeeId,
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

exports.handler = handler;
