import { createAction, props } from '@ngrx/store';
import { CandidateType, Identifier, Interest } from '@conf-match/api';

/**
 * Attendee Liked
 */
export const attendeeLiked = createAction(
  '[Connect UI] Attendee Liked',
  props<{ id: string; identifiers: Identifier[]; interests: Interest[] }>()
);

/**
 * Attendee Disliked
 */
export const attendeeDisliked = createAction(
  '[Connect UI] Attendee Disliked',
  props<{ id: string }>()
);

export const reset = createAction('[Connect UI] Reset');

/**
 * Attendee Like Dislike undone
 */
export const attendeeLikeDislikeUndone = createAction(
  '[Connect UI] Attendee Undone Like / Dislike',
  props<{ id: string; initialType: CandidateType }>()
);

export const attendeeLikeDislikeUndoneStarted = createAction(
  '[Connect UI] Attendee Undone Like / Dislike Started',
  props<{ id: string; initialType: CandidateType }>()
);
