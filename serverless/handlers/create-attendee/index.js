const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const { documentClient } = require('../../utils/aws-s3-client.js');

const {
  ATTENDEE_TABLE_NAME,
  ATTENDEE_DESIRED_IDENTIFIER_TABLE_NAME,
  ATTENDEE_OWN_IDENTIFIER_TABLE_NAME,
  ATTENDEE_INTEREST_TABLE_NAME,
} = process.env;

async function handler(event) {
  console.log('Handling new event', JSON.stringify(event));

  const input = event.arguments.input;

  const writeParams = {
    RequestItems: {},
  };

  const { interests, desiredIdentifiers, ownIdentifiers, ...rootInputFields } = input;

  const attendeeId = input.id || uuidv4();
  writeParams.RequestItems[ATTENDEE_INTEREST_TABLE_NAME] = createInterestsItems(
    attendeeId,
    rootInputFields.eventId,
    rootInputFields.owner,
    interests
  );

  writeParams.RequestItems[ATTENDEE_DESIRED_IDENTIFIER_TABLE_NAME] = createDesiredIdentifiersItems(
    attendeeId,
    rootInputFields.eventId,
    rootInputFields.owner,
    desiredIdentifiers
  );

  writeParams.RequestItems[ATTENDEE_OWN_IDENTIFIER_TABLE_NAME] = createOwnIdentifiersItems(
    attendeeId,
    rootInputFields.eventId,
    rootInputFields.owner,
    ownIdentifiers
  );

  writeParams.RequestItems[ATTENDEE_TABLE_NAME] = [
    mapItemToPutRequest({ ...rootInputFields, __typename: 'Attendee' }, attendeeId),
  ];

  await executeBatchWrite(writeParams);

  return {
    ...rootInputFields,
    id: attendeeId,
  };
}

function createInterestsItems(attendeeId, eventId, owner, interests) {
  return interests
    .map((interestId) => ({
      __typename: 'AttendeeInterest',
      attendeeId,
      interestId,
      eventId,
      owner,
    }))
    .map((item) => mapItemToPutRequest(item));
}

function createDesiredIdentifiersItems(attendeeId, eventId, owner, desiredIdentifiers) {
  return desiredIdentifiers
    .map((identifierId) => ({
      __typename: 'AttendeeDesiredIdentifier',
      attendeeId,
      identifierId,
      eventId,
      owner,
    }))
    .map((item) => mapItemToPutRequest(item));
}

function createOwnIdentifiersItems(attendeeId, eventId, owner, ownIdentifiers) {
  return ownIdentifiers
    .map((identifierId) => ({
      __typename: 'AttendeeOwnIdentifier',
      attendeeId,
      identifierId,
      eventId,
      owner,
    }))
    .map((item) => mapItemToPutRequest(item));
}

function mapItemToPutRequest(item, id) {
  const now = new Date();

  return {
    PutRequest: {
      Item: {
        id: id || uuidv4(),
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        ...item,
      },
    },
  };
}

async function executeBatchWrite(writeParams) {
  // ToDo #423: write in batches of 25
  return documentClient().batchWrite(writeParams).promise();
}

exports.handler = handler;
