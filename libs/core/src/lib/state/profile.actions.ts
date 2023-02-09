import { createAction, props } from '@ngrx/store';
import { UpdateAttendeeInput, Attendee, InterestModel, IdentifierModel } from '@conf-match/api';

export const profileOpened = createAction('[Profile UI] profile opened');

export const savingProfileStarted = createAction(
  '[Edit Profile UI] Saving profile Started',
  props<{ input: UpdateAttendeeInput }>()
);

export const savingProfileSuccess = createAction(
  '[Profile API] Saving profile Success',
  props<{ attendee: Attendee }>()
);

export const savingProfileFailed = createAction(
  '[Profile API] Saving profile Failed',
  props<{ error: any }>()
);

export const editingInterestsStarted = createAction('[Edit Profile UI] Editing Interests Started');

export const editingInterestsSaved = createAction(
  '[Edit Profile Interests UI] Editing Interests Saved',
  props<{ attendeeId: string; interests: InterestModel[] }>()
);

export const editingInterestsSavedSuccess = createAction(
  '[Profile API] Editing Interests Saved Success',
  props<{ attendee: Attendee }>()
);

export const editingInterestsSavedFailed = createAction(
  '[Profile API] Editing Interests Saved Failed',
  props<{ error: any }>()
);

export const editingDesiredIdentifiersStarted = createAction(
  '[Edit Profile UI] Editing Desired Connections Started'
);

export const editingDesiredIdentifiersSaved = createAction(
  '[Edit Profile Connections UI] Editing Desired Connections Saved',
  props<{ attendeeId: string; desiredIdentifiers: IdentifierModel[] }>()
);

export const editingDesiredIdentifiersSavedSuccess = createAction(
  '[Profile API] Editing Desired Connections Saved Success',
  props<{ attendee: Attendee }>()
);

export const editingDesiredIdentifiersSavedFailed = createAction(
  '[Profile API] Editing Desired Connections Saved Failed',
  props<{ error: any }>()
);

export const editingOwnIdentifiersStarted = createAction(
  '[Edit Profile UI] Editing Own Identifiers Started'
);

export const editingOwnIdentifiersSaved = createAction(
  '[Edit Profile Identifiers UI] Editing Own Identifiers Saved',
  props<{ attendeeId: string; ownIdentifiers: IdentifierModel[] }>()
);

export const editingOwnIdentifiersSavedSuccess = createAction(
  '[Profile API] Editing Own Identifiers Saved Success',
  props<{ attendee: Attendee }>()
);

export const editingOwnIdentifiersSavedFailed = createAction(
  '[Profile API] Editing Own Identifiers Saved Failed',
  props<{ error: any }>()
);

// export const editingIdentifiersCancelled = createAction(
//   '[Edit Profile Identifiers UI] Editing Identifiers Cancelled'
// );
