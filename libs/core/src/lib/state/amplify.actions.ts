import { createAction, props } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';
import { CoreUser } from '../models/user';

export interface UserSignOutProps {
  route: any[];
  extras?: NavigationExtras;
}

export const userLoginSuccess = createAction(
  '[Core.Amplify] User logged in',
  props<{ user: CoreUser }>()
);

export const postSignupLoginSuccess = createAction(
  '[Core.Amplify] Post signup login success',
  props<{ user: CoreUser }>()
);

export const userLogoutSuccess = createAction(
  '[Core.Amplify] User logged out',
  props<UserSignOutProps>()
);

export const checkLoginStatusSuccess = createAction(
  '[Core.Amplify] Check Login Status success',
  props<{ user: CoreUser }>()
);

export const checkLoginStatusFailed = createAction('[Core.Amplify] Check Login Status failed');

export const userSignUpAttempted = createAction(
  '[Core.Amplify / Sign Up] User Sign Up Attempted',
  props<{ email: string; password: string }>()
);

export const userSignUpSuccess = createAction(
  '[Core.Amplify / Sign Up] User Sign Up Success',
  props<{ email: string; password: string }>()
);

export const userSignUpFailed = createAction(
  '[Core.Amplify / Sign Up / API] User Sign Up Failed',
  props<{ errors: string[] }>()
);

export const userSignInAttempted = createAction(
  '[Core.Amplify / Sign In] User Sign In Attempted',
  props<{ email: string; password: string }>()
);

export const userSignOutAttempted = createAction(
  '[Core.Amplify / Sign Out] User Sign Out Attempted',
  props<UserSignOutProps>()
);

export const userSignInFailed = createAction(
  '[Core.Amplify / Sign In / API] User Sign In Failed',
  props<{ errors: string[]; email: string }>()
);

export const userAutoSignInAttempted = createAction(
  '[Core.Amplify / Auto Sign In] - User Auto Sign In Attempted',
  props<{ email: string; password: string }>()
);

export const userAutoSignInFailed = createAction(
  '[Core.Amplify / Auto Sign In / API] - User Auto Sign In Failed',
  props<{ errors: string[] }>()
);

export const amplifyEffectsInitialized = createAction('[Core.Amplify] AmplifyEffects Init');

export const userVerifyEmailAttempted = createAction(
  '[Core.Amplify / VerifyEmail] User Verify Email Attempted',
  props<{ code: string; email: string }>()
);

export const userVerifyEmailSuccess = createAction(
  '[Core.Amplify / VerifyEmail / API] User Verify Email Success'
);

export const userVerifyEmailFailed = createAction(
  '[Core.Amplify / VerifyEmail / API] User Verify Email Failed',
  props<{ errors: string[] }>()
);

export const userVerifyEmailCompleted = createAction(
  '[Core.Amplify / VerifyEmail / Storage] - User Verify Email Completed'
);

export const userTermsAcceptAttempted = createAction(
  '[Core.Amplify / Accept Terms / API] User Terms Accept Attempted'
);

export const userTermsAcceptSucceeded = createAction(
  '[Core.Amplify / Accept Terms / API] User Terms Accept Succeeded'
);

export const userTermsAcceptFailed = createAction(
  '[Core.Amplify / Accept Terms / API] User Terms Accept Failed'
);

export const reSendEmailVerificationCodeAttempted = createAction(
  '[Core.Amplify / ReSendEmailVerification] ReSend Email Verification Code Attempted',
  props<{ email: string }>()
);

export const reSendEmailVerificationCodeSuccess = createAction(
  '[Core.Amplify / ReSendEmailVerification / API] ReSend Email Verification Code Success'
);

export const reSendEmailVerificationCodeFailed = createAction(
  '[Core.Amplify / ReSendEmailVerification / API] ReSend Email Verification Code Failed',
  props<{ errors: string[] }>()
);

export const redirectToSignIn = createAction('[Core.Amplify / SignUp / API] Redirect To Sign In');

export const resumeSignUpFlow = createAction(
  '[Core.Amplify / SignUp / API] Resume SignUp flow',
  props<{ email: string }>()
);

export const noop = createAction('[Core.Amplify / API] Noop');

export const authGuardRedirect = createAction(
  '[Core.Amplify / SignIn / API] Unauthenticated navigation',
  props<{ url: string }>()
);
