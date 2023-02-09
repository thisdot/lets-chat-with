import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectSendSecurityCodeErrors, selectSendSecurityCodeLoading } from '../../core.selectors';
import { ResetPasswordState } from '../reducers';

export const resetPasswordFeatureKey = 'ResetPassword';

export const selectResetPassword =
  createFeatureSelector<ResetPasswordState>(resetPasswordFeatureKey);

const selectLoading = createSelector(
  selectResetPassword,
  (resetPassword) => resetPassword?.securityCode?.loading
);
export const selectResetPasswordLoading = createSelector(
  selectLoading,
  selectSendSecurityCodeLoading,
  (resetPasswordLoading, coreLoading) => resetPasswordLoading || coreLoading
);

const selectErrors = createSelector(
  selectResetPassword,
  (resetPassword) => resetPassword?.securityCode?.errors
);
export const selectResetPasswordErrors = createSelector(
  selectErrors,
  selectSendSecurityCodeErrors,
  (resetPasswordErrors, coreErrors) => [...resetPasswordErrors, ...coreErrors]
);
