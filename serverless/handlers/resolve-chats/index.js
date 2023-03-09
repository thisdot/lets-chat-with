const AWS = require('aws-sdk');
const { documentClient } = require('../../utils/aws-s3-client.js');

const { CHAT_THREAD_TABLE_NAME } = process.env;

exports.handler = async (event) => {
  try {
    const { source } = event;
    const { eventId } = source;

    console.log(source);

    return await getChats(eventId);
  } catch (err) {
    console.error(JSON.stringify(err, null, 2));
  }
  return [];
};

async function getChats(eventId) {
  const searchParams = {
    ExpressionAttributeNames: {
      '#eventId': 'eventId',
    },
    ExpressionAttributeValues: {
      ':eventId': eventId,
    },
    KeyConditionExpression: '#eventId = :eventId',
    IndexName: 'byEventId',
    TableName: CHAT_THREAD_TABLE_NAME,
  };

  const Items = await documentClient()
    .query(searchParams)
    .promise()
    .then((res) => [...res.Items]);

  console.log(Items);
  return Items.length ? Items : [];
}
