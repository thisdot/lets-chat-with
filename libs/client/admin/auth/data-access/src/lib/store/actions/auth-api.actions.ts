import { createAction, props } from '@ngrx/store';
import { CoreUser, UserSignOutProps } from '@conf-match/core';
import { User } from '@conf-match/api';

export const userLoginSuccess = createAction(
  '[Auth / API] User logged in',
  props<{ user: CoreUser }>()
);

export const userSignInFailed = createAction(
  '[Auth / API] User Sign In Failed',
  props<{ errors: string[]; email: string }>()
);

export const userLogoutSuccess = createAction(
  '[Auth / API] User logged out',
  props<UserSignOutProps>()
);

export const checkLoginStatusSuccess = createAction(
  '[Auth / API] Check Login Status success',
  props<{ user: CoreUser }>()
);

export const checkLoginStatusFailed = createAction('[Auth / API] Check Login Status failed');

export const authEffectsInitialized = createAction('[Auth / API] AuthEffects Init');

export const userLoadedSuccess = createAction(
  '[Auth / API] User Loaded Success',
  props<{ user: User }>()
);

export const userLoadedFailed = createAction('[Auth / API] User Loaded Failed');
