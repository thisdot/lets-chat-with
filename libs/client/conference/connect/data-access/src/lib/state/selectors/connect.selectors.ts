import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CandidateType, mapAttendeeToAttendeeModel } from '@conf-match/api';
import { selectConferenceId } from '@conf-match/core';
import { ConnectState } from '../reducers';

export const selectConnect = createFeatureSelector<ConnectState>('connect');

const selectEventCandidatesIds = createSelector(
  selectConferenceId,
  selectConnect,
  (eventId, state) => (eventId && state.eventCandidates[eventId]) || []
);

export const selectCandidates = createSelector(
  selectEventCandidatesIds,
  selectConnect,
  (candidatesIds, state) =>
    candidatesIds
      .map((id) => ({
        ...state.candidates[id],
        attendee: mapAttendeeToAttendeeModel(state.candidates[id].attendee),
      }))
      .sort((attendee1, attendee2) =>
        attendee1.attendee.fullName.localeCompare(attendee2.attendee.fullName)
      )
);

export const selectCurrentCandidate = createSelector(selectCandidates, (candidates) =>
  candidates.find((candidate) => candidate.candidateType === CandidateType.UNDECIDED)
);

export const selectNoCandidates = createSelector(selectCandidates, (candidates) =>
  Boolean(candidates.length)
);
