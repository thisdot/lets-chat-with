import attendeeInterest from '../seed-templates/attendeeInterest';
import { OwnedEntry } from '../types';
import { pickRandomSet } from '../utils';
import { generateEntries } from './entries';

const interests = require('../seed-templates/static/interest.json');

export function generateAttendeeInterests(
  attendees: OwnedEntry<{ eventId: string }>[],
  maxCount: number
) {
  return attendees
    .map((attendee) =>
      generateEntries(attendeeInterest, {
        '<attendeeId>': () => [attendee.id],
        '<eventId>': () => [attendee.eventId],
        '<interestId>': () => pickRandomSet(interests, maxCount).map(({ id }) => id),
        '<ownerId>': () => [attendee.owner],
      })
    )
    .flat();
}
