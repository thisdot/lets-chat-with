const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const { documentClient } = require('../../utils/aws-s3-client.js');

const DEFAULT_NOTIFICATION_CONFIG = {
  matches: false,
  messages: false,
  subscribe: false,
};

async function handler(event, context) {
  const owner = event.request.userAttributes.sub;

  if (owner) {
    const user = await getUser({ owner });
    if (user == null) {
      await addUser({ owner, notificationConfig: DEFAULT_NOTIFICATION_CONFIG });
    }
    context.done(null, event);
  } else {
    context.done(null, event);
  }
}

async function getUser({ owner }) {
  const params = {
    ExpressionAttributeNames: { '#owner': 'owner' },
    ExpressionAttributeValues: { ':owner': owner },
    KeyConditionExpression: '#owner = :owner',
    IndexName: 'byOwner',
    TableName: process.env.USER_TABLE_NAME,
  };
  const { Items } = await documentClient().query(params).promise();
  return Items.length ? Items[0] : null;
}

async function addUser(user) {
  const { owner, notificationConfig } = user;
  const date = new Date();

  try {
    const params = {
      Item: {
        id: uuidv4(),
        __typename: 'User',
        owner: owner,
        notificationConfig: notificationConfig,
        createdAt: date.toISOString(),
        updatedAt: date.toISOString(),
        termsAccepted: false,
      },
      TableName: process.env.USER_TABLE_NAME,
    };
    await documentClient().put(params).promise();

    console.log(`Successfully created user record: (${owner})`);
  } catch (err) {
    console.error(`Error when adding user record: (${owner})`, JSON.stringify(err, null, 2));
  }
}

exports.handler = handler;
