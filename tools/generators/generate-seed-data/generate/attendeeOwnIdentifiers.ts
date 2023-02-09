import attendeeOwnIdentifier from '../seed-templates/attendeeOwnIdentifier';
import { OwnedEntry } from '../types';
import { pickRandomSet } from '../utils';
import { generateEntries } from './entries';

const identifiers = require('../seed-templates/static/identifier.json');

export function generateOwnAttendeeIdentifiers(
  attendees: OwnedEntry<{ eventId: string }>[],
  maxCount: number
) {
  return attendees
    .map((attendee) =>
      generateEntries(attendeeOwnIdentifier, {
        '<attendeeId>': () => [attendee.id],
        '<eventId>': () => [attendee.eventId],
        '<identifierId>': () => pickRandomSet(identifiers, maxCount).map(({ id }) => id),
        '<ownerId>': () => [attendee.owner],
      })
    )
    .flat();
}
