import { userLogoutSuccess } from '../../amplify.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { Conference } from '../../../models';
import { ConferencesActions } from '../actions';

export interface ConferencesState {
  attendeeConferences: Conference[];
}

export const initialState = {
  attendeeConferences: [],
};

const reducer = createReducer<{ attendeeConferences: any[] }>(
  initialState,

  on(ConferencesActions.conferencesLoadSuccess, (state, { attendeeConferences }) => ({
    ...state,
    attendeeConferences,
  })),
  on(userLogoutSuccess, () => initialState)
);

export function conferencesReducer(state: ConferencesState | undefined, action: Action) {
  return reducer(state, action);
}
