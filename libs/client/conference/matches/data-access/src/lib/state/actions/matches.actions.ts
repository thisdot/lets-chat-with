import { createAction, props } from '@ngrx/store';
import { Match } from '@conf-match/api';

export const matchesEffectsInitialized = createAction('[Matches] MatchesEffects Init');

export const unmatchAttendee = createAction(
  '[Matches] Unmatch attendee',
  props<{ matchId: string; requestingAttendeeId: string; otherAttendeeId: string }>()
);

export const unmatchAttendeeSuccess = createAction('[Matches] Unmatch attendee success');

export const unmatchAttendeeFailed = createAction('[Matches] Unmatch attendee failed');

export const matchCreatedFromLike = createAction(
  '[Matches] Match created from like',
  props<{ newMatch: Match }>()
);

export const matchCreatedFromPairLike = createAction(
  '[Matches] Match created from pair like',
  props<{ newPairMatch: Match }>()
);

export const markMatchAsRead = createAction(
  '[Matches] Mark match as read',
  props<{ matchId: string; attendeeId: string; attendee1Id: string; attendee2Id: string }>()
);

export const markMatchAsReadSuccess = createAction('[Matches] Mark match as read success');

export const markMatchAsReadFailed = createAction('[Matches] Mark match as read failed');
