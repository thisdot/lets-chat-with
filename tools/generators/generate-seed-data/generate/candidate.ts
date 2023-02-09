import candidateTemplate from '../seed-templates/candidate';
import { OwnedEntry } from '../types';
import { generateEntries } from './entries';

export function generateCandidates(attendees: OwnedEntry<{ eventId: string }>[]) {
  const attendeeIds = attendees.map(({ id }) => id);
  return attendees
    .map(({ id, owner }) =>
      generateEntries(candidateTemplate, {
        '<ownerAttendeeId>': () => [id],
        '<candidateAttendeeId>': () => attendeeIds.filter((candidateId) => candidateId !== id),
        '<ownerId>': () => [owner],
      })
    )
    .flat();
}
