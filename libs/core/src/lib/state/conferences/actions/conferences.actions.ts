import { createAction, props } from '@ngrx/store';
import { Conference } from '../../../models';

export const conferencesLoadAttempted = createAction('[Conferences] Conference Load Attempted');

export const conferencesLoadSuccess = createAction(
  '[Conferences API] Conference Load Success',
  props<{ attendeeConferences: Conference[] }>()
);

export const conferencesLoadFailed = createAction(
  '[Conferences API] Conference Load Failed',
  props<{ errors: string[] }>()
);
