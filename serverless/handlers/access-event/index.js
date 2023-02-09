const AWS = require('aws-sdk');
const { documentClient } = require('../../utils/aws-s3-client.js');

const { EVENT_TABLE_NAME } = process.env;

async function handler(event) {
  try {
    const { arguments, identity } = event;
    const { letsChatWithUrl } = arguments;
    const cognitoId = identity.username;

    const eventId = await accessEvent(letsChatWithUrl, cognitoId);

    console.log(eventId ? `Successfully accessed event: ${eventId}` : 'No event found');

    return eventId;
  } catch (err) {
    console.error(JSON.stringify(err, null, 2));
  }
  return null;
}

async function accessEvent(letsChatWithUrl, cognitoId) {
  const letsChatWithEvent = await findEvent(letsChatWithUrl);

  if (letsChatWithEvent) {
    const existingReaders = letsChatWithEvent.readers || [];
    if (!existingReaders.includes(cognitoId)) {
      const updateParams = {
        Key: { id: letsChatWithEvent.id },
        ExpressionAttributeNames: {
          '#readers': 'readers',
        },
        ExpressionAttributeValues: {
          ':readers': [...existingReaders, cognitoId],
        },
        UpdateExpression: 'set #readers = :readers',
        IndexName: 'byLetsChatWithUrl',
        TableName: EVENT_TABLE_NAME,
      };
      await documentClient().update(updateParams).promise();
    }
    return letsChatWithEvent.id;
  } else {
    return null;
  }
}

async function findEvent(letsChatWithUrl) {
  const searchParams = {
    ExpressionAttributeNames: {
      '#letsChatWithUrl': 'letsChatWithUrl',
    },
    ExpressionAttributeValues: {
      ':letsChatWithUrl': letsChatWithUrl,
    },
    KeyConditionExpression: '#letsChatWithUrl = :letsChatWithUrl',
    IndexName: 'byLetsChatWithUrl',
    TableName: EVENT_TABLE_NAME,
  };
  const { Items } = await documentClient().query(searchParams).promise();
  return Items.length ? Items[0] : null;
}

exports.handler = handler;
