import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectConference } from '../../core.selectors';
import { ConferencesState } from '../reducers';

export const conferencesFeatureKey = 'conferences';

export const selectConferences = createFeatureSelector<ConferencesState>(conferencesFeatureKey);

export const selectAttendeeConferences = createSelector(
  selectConferences,
  (conferences) => conferences?.attendeeConferences
);

export const selectAttendeeConferencesToSelect = createSelector(
  selectAttendeeConferences,
  selectConference,
  (conferences, selectedConference) =>
    conferences.filter((conf) => conf.id !== selectedConference?.id)
);
