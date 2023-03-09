const AWS = require('aws-sdk');
const { documentClient } = require('../../utils/aws-s3-client.js');

const { CHAT_THREAD_TABLE_NAME, MATCH_TABLE_NAME } = process.env;

exports.handler = async (event) => {
  try {
    const { source } = event;
    const { eventId, id } = source;

    return await getChats(eventId, id);
  } catch (err) {
    console.error(JSON.stringify(err, null, 2));
  }
  return [];
};

async function getChats(eventId, id) {
  // get all chats for the provided eventId
  const eventChats = await getEventChats(eventId);
  // get ids for matches where the current attendee id is one of the attendees in the match
  const attendeeMatchIds = await getMatchesForAttendee(eventId, id).then((matches) =>
    matches.map((match) => match.id)
  );
  // filter the event chats for matchIds that exist in the matches array
  const relevantChats = eventChats.filter((chat) => attendeeMatchIds.includes(chat.matchId));
  return relevantChats || [];
}

async function getEventChats(eventId) {
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

  return Items.length ? Items : [];
}

async function getMatchesForAttendee(eventId, attendeeId) {
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
