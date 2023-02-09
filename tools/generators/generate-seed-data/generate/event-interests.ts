import { generateEntries } from './entries';
import eventInterest from '../seed-templates/eventInterest';
import { Entry } from '../types';

const interests = require('../seed-templates/static/interest.json');

export function generateEventInterests(events: Entry<{}>[]) {
  return events
    .map((event) =>
      generateEntries(eventInterest, {
        '<eventId>': () => [event.id],
        '<interestId>': () => interests.map(({ id }) => id),
      })
    )
    .flat();
}
