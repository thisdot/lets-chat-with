import { Action, on, createReducer } from '@ngrx/store';
import { MatchesActions, MatchesAPIActions } from '../actions';
import { Match, MatchAttendee, MatchDetails } from '@conf-match/api';
import {
  ConnectActions,
  ConnectAPIActions,
} from '@conf-match/client/conference/connect/data-access';

export const matchesFeatureKey = 'matches';

export interface AppMatchesState {
  [matchesFeatureKey]: MatchesState;
}

export interface MatchesState {
  conferenceMatchesIds: string[];
  matches: { [id: string]: Match };
  matchesDetails: { [id: string]: MatchDetails };
  newMatch: Match | undefined;
  newPairMatch: Match | undefined;
  lastLikedAttendeeId: string | undefined;
}

export const initialState: MatchesState = {
  conferenceMatchesIds: [],
  matches: {},
  matchesDetails: {},
  newMatch: undefined,
  newPairMatch: undefined,
  lastLikedAttendeeId: undefined,
};

const arrayToObject = (matches: Array<Match>) => {
  return matches
    .map((match) => ({ [match.id]: match }))
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
    MatchesAPIActions.getMatchesSuccessful,
    (state: MatchesState, { matches }): MatchesState => ({
      ...state,
      conferenceMatchesIds: matches.map(({ id }) => id),
      matches: arrayToObject(matches),
    })
  ),
  on(MatchesAPIActions.getMatchSuccessful, (state, { match }) => ({
    ...state,
    matchesDetails: {
      ...state.matchesDetails,
      [match.id]: match,
    },
  })),
  on(MatchesActions.matchCreatedFromLike, (state, { newMatch }) => ({
    ...state,
    newMatch,
  })),
  on(MatchesActions.matchCreatedFromPairLike, (state, { newPairMatch }) => ({
    ...state,
    newPairMatch,
  })),
  on(ConnectAPIActions.createLike, (state, { likedAttendeeId }) => {
    return {
      ...state,
      lastLikedAttendeeId: likedAttendeeId,
    };
  }),
  on(ConnectActions.reset, (state) => {
    return {
      ...state,
      newMatch: null,
      newPairMatch: null,
    };
  })
);

export function matchesReducer(state: MatchesState, action: Action) {
  return reducer(state, action);
}
