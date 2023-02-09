import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AUTH_FEATURE_KEY, AuthState } from '../reducers';

export const selectAuthFeature = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const selectUser = createSelector(selectAuthFeature, (state) => state.user);

export const selectErrors = createSelector(selectAuthFeature, (state) => state.errors);

export const selectIsLoading = createSelector(selectAuthFeature, (state) => state.loading);

export const selectRedirectUrl = createSelector(selectAuthFeature, (state) => state.redirectUrl);
