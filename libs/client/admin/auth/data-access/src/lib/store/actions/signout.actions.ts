import { createAction, props } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export interface UserSignOutProps {
  route: string[];
  extras?: NavigationExtras;
}

export const userSignOutAttempted = createAction(
  '[Sign Out Component] User Sign Out Attempted',
  props<UserSignOutProps>()
);
