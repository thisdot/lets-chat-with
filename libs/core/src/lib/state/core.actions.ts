import { createAction, props } from '@ngrx/store';
import { ApiEvent, Attendee, Report, User } from '@conf-match/api';

interface JoinConferenceData {
  fullName: string;
  title: string;
  company: string;
  pronouns: string;
  newsletterSubscribed: boolean;
  linkedin: string;
  facebook: string;
  twitter: string;
  avatarUrl: string;
  connections: string[];
  identifiers: string[];
  interests: string[];
  bio: string;
  conferenceId: string;
}

export const conferenceStartPolling = createAction('[Conferences UI] Conference Start Polling');

export const conferencePollingAttempted = createAction(
  '[Conferences UI] Conference Polling Attempted',
  props<{ conferenceId: string }>()
);

export const conferenceStopPolling = createAction('[Conferences UI] Conference Stop Polling');

export const conferenceSelected = createAction(
  '[Conferences UI] Conference Selected',
  props<{ conferenceId: string }>()
);

export const attendeeLoaded = createAction(
  '[Conference Guard] Attendee Loaded',
  props<{ attendee: Attendee }>()
);

export const banReportLoaded = createAction(
  '[Conference Ban Guard] Ban Report Loaded',
  props<{ report: Report }>()
);

export const conferenceRetrievedSuccess = createAction(
  '[Event API] Conference retrieved Successfully',
  props<{ conference: ApiEvent }>()
);

export const conferenceRetrievedFailed = createAction(
  '[Event API] Conference retrieved Failed',
  props<{ error: any }>()
);

export const attendeeRetrieved = createAction(
  '[Attendee API] Attendee Retrieved',
  props<{ attendee: Attendee }>()
);

export const joinConferenceAttempted = createAction(
  '[Conferences / Join Conference] Join Conference Attempted',
  props<JoinConferenceData>()
);

export const joinConferenceSuccess = createAction(
  '[Conferences / Join Conference / API] Join Conference Success',
  props<{ conferenceId: string }>()
);

export const joinConferenceFailed = createAction(
  '[Conferences / Join Conference / API] Join Conference Failed'
);

export const coreEffectsInitialized = createAction('[Core] Core Effects Initialized');

export const userLoadedSuccess = createAction(
  '[User API] User Loaded Success',
  props<{ user: User }>()
);

export const userLoadedFailed = createAction('[User API] User Loaded Failed');
