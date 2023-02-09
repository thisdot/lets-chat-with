import { ApiEvent, Attendee, Report, User } from '@conf-match/api';
import { Action, createReducer, on } from '@ngrx/store';
import { CoreUser } from '../models';
import {
  authGuardRedirect,
  checkLoginStatusFailed,
  checkLoginStatusSuccess,
  postSignupLoginSuccess,
  userLoginSuccess,
  userLogoutSuccess,
  userSignInAttempted,
  userSignInFailed,
  userSignUpAttempted,
  userSignUpFailed,
  userTermsAcceptSucceeded,
  userVerifyEmailAttempted,
  userVerifyEmailCompleted,
  userVerifyEmailFailed,
  userVerifyEmailSuccess,
} from './amplify.actions';
import {
  attendeeLoaded,
  attendeeRetrieved,
  banReportLoaded,
  conferenceRetrievedSuccess,
  conferenceSelected,
  userLoadedSuccess,
} from './core.actions';
import {
  editingDesiredIdentifiersSavedSuccess,
  editingOwnIdentifiersSavedSuccess,
  editingInterestsSavedSuccess,
  savingProfileSuccess,
} from './profile.actions';
import { userUpdatedFailed, userUpdatedSuccess } from './settings.actions';

export const coreFeatureKey = 'core';

export interface AppCoreState {
  [coreFeatureKey]: CoreState;
}

export interface CoreState {
  user: CoreUser | null;
  conferenceId: string | null;
  conference: {
    [id: string]: ApiEvent;
  };
  attendee: Attendee | null;
  report: Report | null;
  appUser: User | null;
  securityCode: {
    loading: boolean;
    errors: string[];
  };
  changePassword: {
    loading: boolean;
  };
  auth: {
    errors: string[];
    loading: boolean;
    redirectUrl: string | null;
  };
}

export const initialState: CoreState = {
  user: null,
  conferenceId: null,
  conference: {},
  attendee: null,
  report: null,
  appUser: null,
  securityCode: {
    loading: false,
    errors: [],
  },
  changePassword: {
    loading: false,
  },
  auth: {
    errors: [],
    loading: false,
    redirectUrl: null,
  },
};

const coreReducer = createReducer(
  initialState,

  on(userLoginSuccess, checkLoginStatusSuccess, postSignupLoginSuccess, (state, action) => ({
    ...state,
    user: action.user,
    auth: {
      ...state.auth,
      errors: [],
      loading: false,
    },
  })),

  on(authGuardRedirect, (state, action) => ({
    ...state,
    auth: {
      ...state.auth,
      redirectUrl: action.url,
    },
  })),

  on(userLogoutSuccess, checkLoginStatusFailed, () => initialState),

  on(conferenceSelected, (state, action) => ({
    ...state,
    conferenceId: action.conferenceId,
  })),

  on(conferenceRetrievedSuccess, (state, { conference }) => ({
    ...state,
    conference: conference.id
      ? {
          ...state.conference,
          [conference.id]: conference,
        }
      : state.conference,
  })),

  on(
    attendeeRetrieved,
    savingProfileSuccess,
    editingDesiredIdentifiersSavedSuccess,
    editingInterestsSavedSuccess,
    editingOwnIdentifiersSavedSuccess,
    (state, action) => ({
      ...state,
      attendee: action.attendee,
    })
  ),

  on(editingInterestsSavedSuccess, (state, action) => ({
    ...state,
    attendee: action.attendee,
  })),

  on(userVerifyEmailAttempted, (state) => ({
    ...state,
    securityCode: {
      ...state.securityCode,
      loading: true,
    },
  })),

  on(userVerifyEmailFailed, (state, action) => ({
    ...state,
    securityCode: {
      errors: state.securityCode.errors.concat(action.errors),
      loading: false,
    },
  })),

  on(userVerifyEmailSuccess, (state) => ({
    ...state,
    securityCode: {
      ...state.securityCode,
      loading: false,
    },
  })),

  on(userVerifyEmailCompleted, (state) => ({
    ...state,
    auth: {
      ...state.auth,
      loading: false,
    },
  })),

  on(userSignUpFailed, userSignInFailed, (state, action) => ({
    ...state,
    user: null,
    auth: {
      ...state.auth,
      errors: action.errors,
      loading: false,
    },
  })),

  on(userSignUpAttempted, userSignInAttempted, (state) => ({
    ...state,
    auth: {
      ...state.auth,
      loading: true,
    },
  })),

  on(attendeeLoaded, (state, action) => ({
    ...state,
    attendee: action.attendee,
  })),

  on(banReportLoaded, (state, action) => ({
    ...state,
    report: action.report,
  })),

  on(userLoadedSuccess, userUpdatedSuccess, userUpdatedFailed, (state, action) => ({
    ...state,
    appUser: action.user ?? null,
  })),

  on(userTermsAcceptSucceeded, (state) => ({
    ...state,
    appUser: {
      ...(state.appUser as User),
      termsAccepted: true,
    },
  }))
);

export function reducer(state: CoreState | undefined, action: Action) {
  return coreReducer(state, action);
}
