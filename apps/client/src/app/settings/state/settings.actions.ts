import { createAction, props } from '@ngrx/store';

export const passwordChanged = createAction(
  '[Settings] Password Changed',
  props<{ oldPassword: string; newPassword: string }>()
);

export const passwordChangedSuccess = createAction('[Amplify Auth API] Password Changed Success');

export const passwordChangedFailed = createAction(
  '[Amplify Auth API] Password Changed Failed',
  props<{ error: any }>()
);

export const emailChanged = createAction('[Settings] Email Changed', props<{ email: string }>());

export const emailChangedSuccess = createAction('[Amplify Auth API] Email Changed Success');

export const emailChangedFailed = createAction(
  '[Amplify Auth API] Email Changed Failed',
  props<{ error: any }>()
);

export const emailChangeVerified = createAction(
  '[Settings] Email Change Verified',
  props<{ code: string }>()
);

export const emailChangeVerifiedSuccess = createAction('[Settings] Email Change Verified Success');

export const emailChangeVerifiedFailed = createAction(
  '[Amplify Auth API] Email Change Verified Failed',
  props<{ error: any }>()
);
