import { generateEntries } from './entries';
import eventTemplate from '../seed-templates/event';
import { OwnedEntry } from '../types';
export function generateEvents(attendees: OwnedEntry[]) {
  return eventTemplate
    .map((event) =>
      generateEntries(event, {
        '<readers>': () => [attendees.map(({ owner }) => owner)],
      })
    )
    .flat();
}
