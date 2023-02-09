import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Attendee, Match, MatchDetails } from '@conf-match/api';
import { matchesFeatureKey, MatchesState } from '../reducers';

export const selectMatchesState = createFeatureSelector<MatchesState>(matchesFeatureKey);

export const selectMatches = createSelector(
  selectMatchesState,
  ({ conferenceMatchesIds, matches }) => conferenceMatchesIds.map((id) => matches[id])
);

export const selectNewMatch = createSelector(selectMatchesState, ({ newMatch }) => newMatch);
export const selectNewPairMatch = createSelector(
  selectMatchesState,
  ({ newPairMatch }) => newPairMatch
);

export const selectLastLikedAttendee = createSelector(
  selectMatchesState,
  ({ lastLikedAttendeeId }) => lastLikedAttendeeId
);

export const selectMatch = (id: string) =>
  createSelector(selectMatchesState, ({ matches }): Match => matches[id]);

export const selectMatchDetails = (id: string) =>
  createSelector(selectMatchesState, ({ matchesDetails }): MatchDetails => matchesDetails[id]);

export const selectGetMatchBasicInfo = createSelector(
  selectMatchesState,
  ({ matches }) =>
    (id: string) =>
      matches[id]
);

export const selectMatchAttendee = (id: string) =>
  createSelector(
    selectMatch(id),
    selectMatchDetails(id),
    (match, matchDetails): Attendee =>
      (match || matchDetails) && {
        ...match?.attendee,
        ...matchDetails?.attendee,
      }
  );

// from messages.selectors.ts - to fix the circular dependency
// messages library imports matches library refs, so matches library cannot import messages library refs
// both should probably be one library
// See: https://nx.dev/l/a/structure/dependency-graph#circular-dependencies

export const selectMessages = createFeatureSelector<any>('messages');
export const selectChatThreadList = createSelector(
  selectMessages,
  (state) => state?.chatThreadList
);
