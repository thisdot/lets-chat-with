import { Action, createReducer, on } from '@ngrx/store';
import { ResetPasswordActions } from '../actions';

export interface ResetPasswordState {
  securityCode: {
    loading: boolean;
    errors: string[];
  };
}

export const initialState: ResetPasswordState = {
  securityCode: {
    loading: false,
    errors: [],
  },
};

const reducer = createReducer(
  initialState,

  on(
    ResetPasswordActions.sendSecurityCodeAttempted,
    ResetPasswordActions.resendSecurityCodeAttempted,
    (state) => ({
      ...state,
      securityCode: {
        ...state.securityCode,
        loading: true,
      },
    })
  ),

  on(
    ResetPasswordActions.sendSecurityCodeFailed,
    ResetPasswordActions.resendSecurityCodeFailed,
    (state, action) => ({
      ...state,
      securityCode: {
        errors: state.securityCode.errors.concat(action.errors),
        loading: false,
      },
    })
  ),

  on(
    ResetPasswordActions.sendSecurityCodeSuccess,
    ResetPasswordActions.resendSecurityCodeSuccess,
    (state) => ({
      ...state,
      securityCode: {
        ...state.securityCode,
        loading: false,
      },
    })
  ),

  on(ResetPasswordActions.changePasswordAttempted, (state) => ({
    ...state,
    changePassword: {
      loading: true,
    },
  })),

  on(
    ResetPasswordActions.changePasswordFailed,
    ResetPasswordActions.changePasswordSuccess,
    (state) => ({
      ...state,
      changePassword: {
        loading: false,
      },
    })
  ),

  on(ResetPasswordActions.recoverPassEmailInputCleared, (state) => ({
    ...state,
    securityCode: {
      ...state.securityCode,
      errors: [],
    },
  }))
);

export function resetPasswordReducer(state: ResetPasswordState | undefined, action: Action) {
  return reducer(state, action);
}
