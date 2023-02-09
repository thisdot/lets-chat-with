import { Action, createReducer, on } from '@ngrx/store';
import { Event } from '@conf-match/api';
import { conferenceSelected, conferencesLoadedSuccess } from '../actions/conference.actions';

export const CONF_FEATURE_KEY = 'admin_conferences';

export interface State {
  [CONF_FEATURE_KEY]: ConferencesState;
}

export interface ConferencesState {
  conferences: Event[];
  conferenceId: string;
  errors: string[];
  loading: boolean;
  redirectUrl: string | null;
}

export const initialState: ConferencesState = {
  conferences: [],
  errors: [],
  conferenceId: '',
  loading: false,
  redirectUrl: null,
};

const reducer = createReducer(
  initialState,

  on(conferencesLoadedSuccess, (state, action) => {
    return {
      ...state,
      conferences: action.conferences,
      errors: [],
      loading: false,
    };
  }),

  on(conferenceSelected, (state, action) => {
    return {
      ...state,
      conferenceId: action.conferenceId,
      errors: [],
      loading: false,
    };
  })
);

export function conferencesReducer(state: ConferencesState | undefined, action: Action) {
  return reducer(state, action);
}
