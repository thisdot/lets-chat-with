import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Auth from '@aws-amplify/auth';
import { GetUserByOwnerGQL, UpdateUserGQL } from '@conf-match/api';
import { NotificationService, NotificationType } from '@conf-match/shared/ui-notifications';
import { TranslocoService } from '@ngneat/transloco';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  filter,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { AuthService } from '../amplify/auth.service';

import {
  amplifyEffectsInitialized,
  checkLoginStatusFailed,
  checkLoginStatusSuccess,
  postSignupLoginSuccess,
  reSendEmailVerificationCodeAttempted,
  reSendEmailVerificationCodeFailed,
  reSendEmailVerificationCodeSuccess,
  resumeSignUpFlow,
  redirectToSignIn,
  userAutoSignInAttempted,
  userAutoSignInFailed,
  userLoginSuccess,
  userLogoutSuccess,
  userSignInAttempted,
  userSignInFailed,
  userSignOutAttempted,
  userSignUpAttempted,
  userSignUpFailed,
  userSignUpSuccess,
  userTermsAcceptAttempted,
  userTermsAcceptFailed,
  userTermsAcceptSucceeded,
  userVerifyEmailAttempted,
  userVerifyEmailCompleted,
  userVerifyEmailFailed,
  userVerifyEmailSuccess,
} from './amplify.actions';
import { userLoadedFailed, userLoadedSuccess } from './core.actions';
import { selectAuthRedirectUrl, selectUserId } from './core.selectors';
import { resendSecurityCodeSuccess } from './reset-password/actions/reset-password.actions';
import { retry } from '../operators/retry';
import { filterNotNullOrUndefined } from '@conf-match/utilities';

const NotificationTtl = 3000;

@Injectable()
export class AmplifyEffects implements OnInitEffects {
  public checkLoginStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(amplifyEffectsInitialized),
      switchMap(() =>
        this.authService.getCurrentUser().pipe(
          map((user) => checkLoginStatusSuccess({ user })),
          catchError((e) => {
            console.error(e);
            return of(checkLoginStatusFailed());
          })
        )
      )
    )
  );

  public signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userSignInAttempted),
      withLatestFrom(this.store.select(selectAuthRedirectUrl)),
      exhaustMap(([{ email, password }, redirectUrl]) =>
        this.authService.signIn(email, password).pipe(
          map((user) => userLoginSuccess({ user })),
          tap(() => void this.router.navigateByUrl(redirectUrl || '/conferences')),
          catchError((error) =>
            of(
              userSignInFailed({
                errors: [error.message],
                email,
              })
            )
          )
        )
      )
    )
  );

  public signInFailed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userSignInFailed),
      map(({ errors, email }) => ({
        email,
        isNotConfirmedUser: this.isANotConfirmedUserError(errors),
      })),
      filter(({ isNotConfirmedUser }) => isNotConfirmedUser),
      map(({ email }) => resumeSignUpFlow({ email }))
    )
  );

  public resumeSignUpFlow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(resumeSignUpFlow),
      tap(({ email }) => this.router.navigate(['/signup', 'verify'], { queryParams: { email } })),
      map(({ email }) => reSendEmailVerificationCodeAttempted({ email }))
    )
  );

  public signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userSignUpAttempted),
      exhaustMap(({ email, password }) =>
        this.authService.signUp(email, password).pipe(
          map(() =>
            userSignUpSuccess({
              email,
              password,
            })
          ),
          catchError((error) => of(userSignUpFailed({ errors: [error.message] })))
        )
      )
    )
  );
  public showAuthErrorNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userSignUpFailed, userSignInFailed),
        switchMap((action) => this.showAuthErrorNotification(action.errors))
      ),
    { dispatch: false }
  );
  public userVerificationStarted$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userSignUpSuccess),
        tap(({ email }) => {
          this.router.navigate(['/signup', 'verify'], { queryParams: { email } });
        })
      ),
    { dispatch: false }
  );

  public signInAfterSignUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userAutoSignInAttempted),
      exhaustMap(({ email, password }) =>
        this.authService.signIn(email, password).pipe(
          map((user) => postSignupLoginSuccess({ user })),
          tap(() => {
            this.router.navigate(['/signup', 'terms']);
          }),
          catchError((error) => of(userAutoSignInFailed({ errors: [error.message] })))
        )
      )
    )
  );

  public acceptTerms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userTermsAcceptAttempted),
      withLatestFrom(
        this.store.select(selectUserId).pipe(filterNotNullOrUndefined()),
        this.store.select(selectAuthRedirectUrl)
      ),
      switchMap(([, userId, redirectUrl]) =>
        this.updateUser
          .mutate({
            input: {
              id: userId,
              termsAccepted: true,
            },
          })
          .pipe(
            retry(),
            map(() => userTermsAcceptSucceeded()),
            tap(() => this.router.navigate([redirectUrl || '/conferences'])),
            catchError(() => of(userTermsAcceptFailed()))
          )
      )
    )
  );

  public checkTermsAfterLoadingUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userLoadedSuccess),
        tap((action) => {
          if (!action.user.termsAccepted) {
            this.router.navigate(['/signup', 'terms']);
          }
        })
      ),
    { dispatch: false }
  );

  public autoSignInFailed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userAutoSignInFailed),
      map(() => userSignOutAttempted({ route: ['/signin'] }))
    )
  );

  public signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userSignOutAttempted),
      switchMap(({ route, extras }) =>
        this.authService.signOut().pipe(map(() => userLogoutSuccess({ route, extras })))
      )
    )
  );

  public logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userLogoutSuccess),
        tap(({ route, extras }) => {
          // TODO: Decide where that key will be kept
          localStorage.removeItem('cm-onboarding-completed');
          this.router.navigate(route, extras);
        })
      ),
    { dispatch: false }
  );
  public reSendEmailVerificationCodeAttempted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reSendEmailVerificationCodeAttempted),
      exhaustMap(({ email }) =>
        from(Auth.resendSignUp(email)).pipe(
          map(() => reSendEmailVerificationCodeSuccess()),
          catchError((e: { message: string }) =>
            of(reSendEmailVerificationCodeFailed({ errors: [e.message] }))
          )
        )
      )
    )
  );
  public reSendEmailVerificationCodeSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(reSendEmailVerificationCodeSuccess, resendSecurityCodeSuccess),
        switchMap((_) =>
          this.notifications
            .createNotification(
              {
                type: NotificationType.Success,
                title: this.translate.translate('resend.notifications.success'),
              },
              true
            )
            .closeWhenBackdropClick()
        )
      ),
    { dispatch: false }
  );
  public reSendEmailVerificationCodeFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(reSendEmailVerificationCodeFailed),
        tap(({ errors }) => this.showAuthErrorNotification(errors))
      ),
    { dispatch: false }
  );
  public verifyEmailAttempted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userVerifyEmailAttempted),
      switchMap(({ code, email }) =>
        from(Auth.confirmSignUp(email, code)).pipe(
          map(() => userVerifyEmailSuccess()),
          catchError((error) => of(userVerifyEmailFailed({ errors: [error.message] })))
        )
      )
    )
  );
  public verifyEmailSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userVerifyEmailSuccess),
      map(() => userVerifyEmailCompleted())
    )
  );
  public verifyEmailCompleted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userVerifyEmailCompleted),
      map(() => redirectToSignIn())
    )
  );
  public signUpFlowBroken$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(redirectToSignIn),
        tap(() => {
          this.router.navigate(['/signin']);
        })
      ),
    { dispatch: false }
  );
  public loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userLoginSuccess, checkLoginStatusSuccess, postSignupLoginSuccess),
      switchMap((action) =>
        this.getUserByOwner
          .fetch({ owner: action.user.cognitoId }, { fetchPolicy: 'network-only' })
          .pipe(
            tap(({ data }) => {
              if (!data.getUserByOwner.items.length) {
                throw Error(`Cannot find user by owner (${action.user.cognitoId})`);
              }
            }),
            map(({ data }) =>
              userLoadedSuccess({
                user: data.getUserByOwner.items[0],
              })
            ),
            catchError((e) => {
              console.error(e);
              return of(userLoadedFailed());
            })
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private notifications: NotificationService,
    private getUserByOwner: GetUserByOwnerGQL,
    private updateUser: UpdateUserGQL,
    private authService: AuthService,
    private translate: TranslocoService,
    private store: Store<any>
  ) {}

  ngrxOnInitEffects() {
    return amplifyEffectsInitialized();
  }

  private showAuthErrorNotification(errors: string[]) {
    return this.notifications.createNotification$(
      {
        type: NotificationType.Unavailable,
        title: this.translate.translate('userAuth.toaster.error.title'),
        message: errors.join('\n'),
        closeable: true,
        ttl: NotificationTtl,
      },
      false
    );
  }

  private isANotConfirmedUserError(errors: string[]): boolean {
    return errors.some((error) => RegExp(/user is not confirmed/i).test(error));
  }
}
