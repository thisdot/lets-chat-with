import { createAction, props } from '@ngrx/store';

export const conferenceJoinAttempted = createAction(
  '[Conferences UI] Conference join attempted',
  props<{ letsChatWithUrl: string }>()
);

export const conferenceJoinDuplicated = createAction(
  '[Conferences UI] Conference join duplicated',
  props<{ letsChatWithUrl: string }>()
);

export const conferenceJoinAttemptSuccess = createAction(
  '[Conferences UI] Conference join attempt success',
  props<{ eventId: string }>()
);

export const conferenceJoinAttemptNotExist = createAction(
  '[Conferences UI] Conference join attempt not exist'
);

export const conferenceJoinAttemptFailure = createAction(
  '[Conferences UI] Conference join attempt failure'
);

export const conferenceQrScanFailure = createAction(
  '[Conferences UI] Conference scan attempt failure'
);

export const conferenceQrScanAllowCamera = createAction(
  '[Conferences UI] Conference scan has no camera permissions'
);
