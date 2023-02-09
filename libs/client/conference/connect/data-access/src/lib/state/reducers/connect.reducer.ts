import { Action, on, createReducer } from '@ngrx/store';
import { ConnectAPIActions, ConnectActions } from '../actions';
import { Candidate, CandidateType } from '@conf-match/api';

export const connectFeatureKey = 'connect';

export interface AppConnectState {
  [connectFeatureKey]: ConnectState;
}

export interface ConnectState {
  eventCandidates: { [eventId: string]: string[] };
  candidates: { [id: string]: Candidate };
}

export const initialState: ConnectState = {
  eventCandidates: {},
  candidates: {},
};

const updateCandidate = (state: ConnectState, id: string, candidate: Partial<Candidate>) => {
  return {
    ...state.candidates,
    [id]: {
      ...state.candidates[id],
      ...candidate,
    },
  };
};

const arrayToObject = (candidates: Array<Candidate>) => {
  return candidates
    .map((candidate) => ({ [candidate.id]: candidate }))
    .reduce(
      (curr, acc) => ({
        ...acc,
        ...curr,
      }),
      {}
    );
};

const reducer = createReducer(
  initialState,
  on(
    ConnectAPIActions.getCandidatesSuccessful,
    (state: ConnectState, { candidates, eventId }): ConnectState => ({
      ...state,
      eventCandidates: {
        [eventId]: candidates.map(({ id }) => id),
      },
      candidates: {
        ...state.candidates,
        ...arrayToObject(candidates),
      },
    })
  ),
  on(
    ConnectAPIActions.attendeeLikedFailed,
    ConnectAPIActions.attendeeDislikedFailed,
    ConnectActions.attendeeLikeDislikeUndoneStarted,
    (state: ConnectState, action): ConnectState => ({
      ...state,
      candidates: updateCandidate(state, action.id, {
        candidateType: CandidateType.UNDECIDED,
      }),
    })
  ),
  on(
    ConnectAPIActions.attendeeLikeDislikeUndoneFailed,
    (state: ConnectState, action): ConnectState => ({
      ...state,
      candidates: updateCandidate(state, action.id, {
        candidateType: action.initialType,
      }),
    })
  )
);

export function connectReducer(state: ConnectState, action: Action) {
  return reducer(state, action);
}
