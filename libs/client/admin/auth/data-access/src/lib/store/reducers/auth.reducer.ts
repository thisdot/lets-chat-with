import { Action, createReducer, on } from '@ngrx/store';
import { CoreUser } from '@conf-match/core';
import { AuthAPIActions, AuthGuardActions, SignInActions } from '../actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface State {
  [AUTH_FEATURE_KEY]: AuthState;
}

export interface AuthState {
  user: CoreUser | null;
  errors: string[];
  loading: boolean;
  redirectUrl: string | null;
}

export const initialState: AuthState = {
  user: null,
  errors: [],
  loading: false,
  redirectUrl: null,
};

const reducer = createReducer(
  initialState,

  on(AuthAPIActions.userLoginSuccess, AuthAPIActions.checkLoginStatusSuccess, (state, action) => ({
    ...state,
    user: action.user,
    errors: [],
    loading: false,
  })),

  on(AuthGuardActions.authGuardRedirect, (state, action) => ({
    ...state,
    redirectUrl: action.url,
  })),

  on(AuthAPIActions.userLogoutSuccess, AuthAPIActions.checkLoginStatusFailed, () => initialState),

  on(AuthAPIActions.userSignInFailed, (state, action) => ({
    ...state,
    user: null,
    errors: action.errors,
    loading: false,
  })),

  on(SignInActions.userSignInAttempted, (state) => ({
    ...state,
    loading: true,
  }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return reducer(state, action);
}
