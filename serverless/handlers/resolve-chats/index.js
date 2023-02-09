const AWS = require('aws-sdk');
const { documentClient } = require('../../utils/aws-s3-client.js');

const { CHAT_THREAD_TABLE_NAME } = process.env;

exports.handler = async (event) => {
  try {
    const { source } = event;
    const { id, eventId } = source;

    return await getChats(eventId, id);
  } catch (err) {
    console.error(JSON.stringify(err, null, 2));
  }
  return [];
};

async function getChats(eventId) {
  const searchParamsBase = {
    KeyConditionExpression: '#eventId = :eventId',
    IndexName: 'byEventId',
    TableName: CHAT_THREAD_TABLE_NAME,
  };

  const Items = await Promise.all([
    documentClient()
      .query({
        ...searchParamsBase,
        ExpressionAttributeNames: {
          '#eventId': 'eventId',
        },
        ExpressionAttributeValues: {
          ':eventId': eventId,
        },
      })
      .promise(),
  ]).then((res) => [...res.Items]);

  return Items.length ? Items : [];
}
