import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoreState } from './core.reducer';
import { getMaximumIdentifiers, getMaximumInterests } from './util';

export const selectCore = createFeatureSelector<CoreState>('core');
export const selectUser = createSelector(selectCore, (core) => core?.user);
export const selectOwnerId = createSelector(selectUser, (user) => user?.cognitoId);

export const selectConferenceId = createSelector(selectCore, (core) => core?.conferenceId);
const selectConferences = createSelector(selectCore, (core) => core?.conference);
export const selectConference = createSelector(
  selectConferenceId,
  selectConferences,
  (conferenceId, conferences) => (conferenceId ? conferences[conferenceId] : null)
);

export const selectConferenceShareData = createSelector(selectConference, (conference) => ({
  qrImageUrl: conference?.qrImageUrl,
  shareUrl: `${window.location.protocol}//${window.location.host}/conferences/read-qr?domain=${conference?.letsChatWithUrl}`,
}));

export const selectConferenceInterests = createSelector(
  selectConference,
  (conference) => conference?.interests || []
);

export const selectConferenceConnections = createSelector(
  selectConference,
  (conference) => conference?.identifiers || []
);

export const selectMaximumInterests = createSelector(selectConference, (conference) =>
  getMaximumInterests(conference)
);

export const selectMaximumIdentifiers = createSelector(selectConference, (conference) =>
  getMaximumIdentifiers(conference)
);

export const selectSendSecurityCodeLoading = createSelector(
  selectCore,
  (core) => core?.securityCode?.loading
);

export const selectSendSecurityCodeErrors = createSelector(
  selectCore,
  (core) => core?.securityCode?.errors
);

export const selectChangePasswordLoading = createSelector(
  selectCore,
  (core) => core?.changePassword?.loading
);

export const selectAuthErrors = createSelector(selectCore, (core) => core?.auth?.errors);

export const selectAuthRedirectUrl = createSelector(selectCore, (core) => core?.auth?.redirectUrl);

export const selectAuthLoading = createSelector(selectCore, (core) => core?.auth?.loading);

export const selectAttendee = createSelector(selectCore, (core) => core?.attendee);

export const selectReport = createSelector(selectCore, (core) => core?.report);

export const selectAttendeeId = createSelector(selectAttendee, (attendee) => attendee?.id);

export const selectAppUser = createSelector(selectCore, (core) => core?.appUser);

export const selectAppUserNotificationConfig = createSelector(
  selectAppUser,
  (user) => user?.notificationConfig
);
export const selectUserId = createSelector(selectAppUser, (user) => user?.id);
