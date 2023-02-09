import { createAction, props } from '@ngrx/store';

export const authGuardRedirect = createAction(
  '[Auth Guard] Unauthenticated navigation',
  props<{ url: string }>()
);
