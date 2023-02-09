import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService, NotificationType } from '@conf-match/shared/ui-notifications';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import Auth from '@aws-amplify/auth';
import { from, of } from 'rxjs';
import { exhaustMap, map, catchError, tap, withLatestFrom, filter } from 'rxjs/operators';
import { ResetPasswordActions } from '../actions';
import { Location } from '@angular/common';
import { ResetPasswordFlowService } from '../../../auth/reset-password-flow.service';
import { TranslocoService } from '@ngneat/transloco';
import { filterNotNullOrUndefined } from '@conf-match/utilities';

@Injectable()
export class ResetPasswordEffects {
  public sendSecurityCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResetPasswordActions.sendSecurityCodeAttempted),
      filterNotNullOrUndefined(),
      exhaustMap(({ email }) =>
        from(Auth.forgotPassword(email)).pipe(
          tap(() => this.resetPasswordFlowService.writeResetPasswordFlowCache({ email })),
          map(() => ResetPasswordActions.sendSecurityCodeSuccess()),
          catchError((e: { message: string }) =>
            of(
              ResetPasswordActions.sendSecurityCodeFailed({
                errors: [e.message],
              })
            )
          )
        )
      )
    )
  );

  public resendSecurityCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResetPasswordActions.resendSecurityCodeAttempted),
      withLatestFrom(this.resetPasswordFlowService.resetPasswordFlowCache$),
      map(([_, data]) => data),
      filterNotNullOrUndefined(),
      exhaustMap(({ email }) =>
        from(Auth.forgotPassword(email)).pipe(
          map(() => ResetPasswordActions.resendSecurityCodeSuccess()),
          catchError((e: { message: string }) =>
            of(
              ResetPasswordActions.resendSecurityCodeFailed({
                errors: [e.message],
              })
            )
          )
        )
      )
    )
  );

  public sendSecurityCodeSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ResetPasswordActions.sendSecurityCodeSuccess,
          ResetPasswordActions.resendSecurityCodeSuccess
        ),
        tap(() => {
          this.router.navigate(['/recover-pass/code'], {
            state: { dataObtained: true },
          });
        })
      ),
    { dispatch: false }
  );

  public submitResetPasswordCode$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ResetPasswordActions.submitResetPasswordCode),
        tap(({ code }) => {
          this.resetPasswordFlowService.patchResetPasswordFlowCache({ code });
          this.router.navigate(['/recover-pass/new-pass'], {
            state: { dataObtained: true },
          });
        })
      ),
    { dispatch: false }
  );

  public changePasswordAttempted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResetPasswordActions.changePasswordAttempted),
      withLatestFrom(
        this.resetPasswordFlowService.resetPasswordFlowCache$.pipe(filterNotNullOrUndefined())
      ),
      tap(([{ password }, { email, code }]) => {}),
      exhaustMap(([{ password }, { email, code }]) =>
        from(Auth.forgotPasswordSubmit(email, code ?? '', password)).pipe(
          map(() => ResetPasswordActions.changePasswordSuccess()),
          catchError((error) =>
            of(
              ResetPasswordActions.changePasswordFailed({
                errors: [error.message],
              })
            )
          )
        )
      )
    )
  );

  public changePasswordSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ResetPasswordActions.changePasswordSuccess),
        tap(() => {
          this.router.navigate(['/signin']);
          this.notifications.createNotification({
            type: NotificationType.Success,
            title: this.transloco.translate('resetPassword.notifications.resetSuccess'),
          });
        })
      ),
    { dispatch: false }
  );

  public changePasswordFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ResetPasswordActions.changePasswordFailed),
        tap(({ errors }) => {
          this.notifications.createNotification({
            // Todo: Add error type
            type: NotificationType.Unavailable,
            title: this.transloco.translate('resetPassword.notifications.resetFailed'),
            message: errors.join('\n'),
          });
          this.router.navigate(['/recover-pass/code'], {
            state: { invalidCode: true, dataObtained: true },
          });
          this.location.replaceState('/recover-pass/code');
          this.location.back();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location,
    private notifications: NotificationService,
    private resetPasswordFlowService: ResetPasswordFlowService,
    private transloco: TranslocoService
  ) {}
}
