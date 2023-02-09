import eventIdentifier from '../seed-templates/eventIdentifier';
import { Entry } from '../types';
import { generateEntries } from './entries';

const identifiers = require('../seed-templates/static/identifier.json');

export function generateEventIdentifiers(events: Entry<{}>[]) {
  return events
    .map((event) =>
      generateEntries(eventIdentifier, {
        '<eventId>': () => [event.id],
        '<identifierId>': () => identifiers.map(({ id }) => id),
      })
    )
    .flat();
}
