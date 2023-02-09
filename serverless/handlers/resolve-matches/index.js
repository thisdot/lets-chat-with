const AWS = require('aws-sdk');
const { documentClient } = require('../../utils/aws-s3-client.js');

const { MATCH_TABLE_NAME } = process.env;

exports.handler = async (event) => {
  try {
    const { source } = event;
    const { id, eventId } = source;

    return await getMatches(eventId, id);
  } catch (err) {
    console.error(JSON.stringify(err, null, 2));
  }
  return [];
};

async function getMatches(eventId, attendeeId) {
  const searchParamsBase = {
    KeyConditionExpression: '#eventId = :eventId',
    IndexName: 'byEventId',
    TableName: MATCH_TABLE_NAME,
  };

  const Items = await Promise.all([
    documentClient()
      .query({
        ...searchParamsBase,
        ExpressionAttributeNames: {
          '#attendee1Id': 'attendee1Id',
          '#eventId': 'eventId',
        },
        ExpressionAttributeValues: {
          ':attendee1Id': attendeeId,
          ':eventId': eventId,
        },
        FilterExpression: '#attendee1Id = :attendee1Id',
      })
      .promise(),
    documentClient()
      .query({
        ...searchParamsBase,
        ExpressionAttributeNames: {
          '#attendee2Id': 'attendee2Id',
          '#eventId': 'eventId',
        },
        ExpressionAttributeValues: {
          ':attendee2Id': attendeeId,
          ':eventId': eventId,
        },
        FilterExpression: '#attendee2Id = :attendee2Id',
      })
      .promise(),
  ]).then(([res1, res2]) => [...res1.Items, ...res2.Items]);

  return Items.length ? Items : [];
}
