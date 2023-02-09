import { createAction, props } from '@ngrx/store';
import { Event } from '@conf-match/api';

export const conferenceEffectsInitialized = createAction(
  '[Conferences Admin / API] ConferenceEffects Init'
);

export const conferencesLoadAttempted = createAction(
  '[Conferences Admin / API] Conference Load Attempted'
);

export const conferencesLoadFailed = createAction('[Conferences / API] Conference Load Failed');

export const conferencesLoadedSuccess = createAction(
  '[Conferences Admin / API] Conference Loaded Success',
  props<{ conferences: Event[] }>()
);

export const conferenceSelected = createAction(
  '[Conferences Admin / UI] Conference Selected',
  props<{ conferenceId: string }>()
);
