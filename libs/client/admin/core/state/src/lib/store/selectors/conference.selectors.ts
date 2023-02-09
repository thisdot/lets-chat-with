import { selectUser } from '@conf-match/core';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CONF_FEATURE_KEY, ConferencesState } from '../reducers/conference.reducer';

export const selectConfFeature = createFeatureSelector<ConferencesState>(CONF_FEATURE_KEY);

export const selectConferenceId = createSelector(selectConfFeature, (state) => state?.conferenceId);

export const selectConferences = createSelector(selectConfFeature, (state) => state?.conferences);

export const selectConference = createSelector(
  selectConferenceId,
  selectConferences,
  (conferenceId, conferences) => {
    return conferenceId ? conferences?.find((conf) => conf.id === conferenceId) : null;
  }
);

export const selectErrors = createSelector(selectConfFeature, (state) => state.errors);

export const selectIsLoading = createSelector(selectConfFeature, (state) => state.loading);

export const selectRedirectUrl = createSelector(selectConfFeature, (state) => state.redirectUrl);

export const selectUserWithConference = createSelector(
  selectConferenceId,
  selectUser,
  (conferenceId, user) => ({
    conferenceId,
    user,
  })
);
