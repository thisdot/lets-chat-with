import { createAction, props } from '@ngrx/store';

export const userSignInAttempted = createAction(
  '[Sign In Component] User Sign In Attempted',
  props<{ email: string; password: string }>()
);
