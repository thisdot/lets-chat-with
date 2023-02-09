import { NotificationConfig, User } from '@conf-match/api';
import { createAction, props } from '@ngrx/store';

export const userNotificationConfigUpdated = createAction(
  '[Settings UI] User Notification Config Updated',
  props<{ config: NotificationConfig }>()
);

export const userUpdatedSuccess = createAction(
  '[User API] User successfully updated',
  props<{ user?: User }>()
);

export const userUpdatedFailed = createAction(
  '[User API] User failed to updated',
  props<{ user: User | null }>()
);
