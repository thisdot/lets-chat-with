import { createAction, props } from '@ngrx/store';
import { Candidate, CandidateType, MatchAttendee } from '@conf-match/api';

export const attendeeLikedSuccess = createAction(
  '[Candidate API] Attendee Liked Success',
  props<{ candidate: Candidate }>()
);

export const attendeeLikedFailed = createAction(
  '[Candidate API] Attendee Liked Failed',
  props<{ id: string }>()
);

export const attendeeDislikedSuccess = createAction(
  '[Candidate API] Attendee Disliked Success',
  props<{ candidate: Candidate }>()
);

export const attendeeDislikedFailed = createAction(
  '[Candidate API] Attendee Disliked Failed',
  props<{ id: string }>()
);

export const attendeeLikeDislikeUndoneSuccess = createAction(
  '[Candidate API] Attendee Undone Like / Dislike Success',
  props<{ candidate: Candidate }>()
);

export const attendeeLikeDislikeUndoneFailed = createAction(
  '[Candidate API] Attendee Undone Like / Dislike Failed',
  props<{ id: string; initialType: CandidateType }>()
);

export const getCandidatesSuccessful = createAction(
  '[Candidate API] Candidates get successfully',
  props<{ candidates: Array<Candidate>; eventId: string }>()
);

export const createLike = createAction(
  '[Candidate API] Like created',
  props<{ likedAttendeeId: string }>()
);
