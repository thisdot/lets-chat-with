const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const { documentClient } = require('../../utils/aws-s3-client.js');

const { EVENT_TABLE_NAME, EVENT_IDENTIFIER_TABLE_NAME, EVENT_INTEREST_TABLE_NAME } = process.env;

async function handler(lambdaEvent) {
  console.log(`Creating new conference`, JSON.stringify(lambdaEvent));

  /**
   * I don't think that this should be the part where we create admins for a conference. Currently, all admins are system admins.
   * See issue #613 (https://github.com/thisdot/lets-chat-with/issues/613)
   *
   * When the above issue is resolved, then we should be able to set up conference-admin rights in this call and create the admin users.
   */
  const { event, identifiers, interests } = lambdaEvent;

  const conferenceId = uuidv4();

  const conference = {
    __typename: 'Event',
    // TODO: I hardcoded this to 'DRAFT' because I think we'll need to manually publish the conferences
    status: 'DRAFT',
    name: event.name,
    size: event.size,
    description: event.description,
    maxInterests: event.maxInterests,
    maxIdentifiers: event.maxIdentifiers,
    logoUrl: event.logoUrl,
    qrImageUrl: event.qrImageUrl,
    letsChatWithUrl: event.letsChatWithUrl.toLowerCase(),
    dateRange: event.dateRange,
    // the dev test organisation id is '052a154d-a0ac-4d83-89d4-77a95be6079f'
    organizationId: event.organizationId,
    // TODO: I have no idea what is this
    totalAmountDue: event.totalAmountDue,
    // TODO: I think this gets updated when somebody joins the conference, but needs confirmation if we should provide the admins here as well
    readers: [],
  };

  /**
   * In the request there should be an array of Identifier ID provided
   */
  const identifier_entries = identifiers.map((identifierId) =>
    mapItemToPutRequest({
      __typename: 'EventIdentifier',
      eventId: conferenceId,
      identifierId,
    })
  );

  const interest_entries = interests.map((interestId) =>
    mapItemToPutRequest({
      __typename: 'EventInterest',
      eventId: conferenceId,
      interestId,
    })
  );

  const writeParams = {
    RequestItems: {
      [EVENT_TABLE_NAME]: [mapItemToPutRequest(conference, conferenceId)],
      [EVENT_IDENTIFIER_TABLE_NAME]: identifier_entries,
      [EVENT_INTEREST_TABLE_NAME]: interest_entries,
    },
  };

  console.log('writeParams', JSON.stringify(writeParams));

  await executeBatchWrite(writeParams);

  return {
    data: lambdaEvent,
    id: conferenceId,
  };
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
