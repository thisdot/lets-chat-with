import { generateEntries } from './entries';
import attendeeTemplate from '../seed-templates/attendee';
import { OwnedEntry } from '../types';
import { getIndexedValueGenerator } from './valueGenerator';

export function generateAttendee(users: OwnedEntry[]) {
  const nameGenerator = getIndexedValueGenerator((attendeeCount) => [
    `Test User ${attendeeCount + 1}`,
  ]);
  return users
    .map(({ id, owner }) =>
      generateEntries(attendeeTemplate, {
        '<ownerId>': () => [owner],
        '<userId>': () => [id],
        '<name>': nameGenerator,
      })
    )
    .flat();
}
