import { createAction, props } from '@ngrx/store';

export const sendSecurityCodeAttempted = createAction(
  '[Core.Amplify / RecoverPass-SendCode] Send Security Code Attempted',
  props<{ email: string }>()
);

export const sendSecurityCodeSuccess = createAction(
  '[Core.Amplify / RecoverPass-SendCode / API] Send Security Code Success'
);

export const sendSecurityCodeFailed = createAction(
  '[Core.Amplify / RecoverPass-SendCode / API] Send Security Code Failed',
  props<{ errors: string[] }>()
);

export const resendSecurityCodeAttempted = createAction(
  '[Core.Amplify / RecoverPass-ResendCode] Change Security Code Attempted'
);

export const resendSecurityCodeSuccess = createAction(
  '[Core.Amplify / RecoverPass-ResendCode / API] Resend Security Code Success'
);

export const resendSecurityCodeFailed = createAction(
  '[Core.Amplify / RecoverPass-ResendCode / API] Send Security Code Failed',
  props<{ errors: string[] }>()
);

export const submitResetPasswordCode = createAction(
  '[ResetCodeComponent] Submit Reset Password Code',
  props<{ code: string }>()
);

export const changePasswordAttempted = createAction(
  '[Core.Amplify / RecoverPass-ChangePass] Change Password Attempted',
  props<{ password: string }>()
);

export const changePasswordSuccess = createAction(
  '[Core.Amplify / RecoverPass-ChangePass / API] Change Password Success'
);

export const changePasswordFailed = createAction(
  '[Core.Amplify / RecoverPass-ChangePass / API] Change Password Failed',
  props<{ errors: string[] }>()
);

export const recoverPassEmailInputCleared = createAction(
  '[Core.Amplify / RecoverPass] Recover Pass Email Input Cleared'
);
