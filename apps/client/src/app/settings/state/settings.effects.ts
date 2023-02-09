import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService, NotificationType } from '@conf-match/shared/ui-notifications';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import {
  emailChanged,
  emailChangedFailed,
  emailChangedSuccess,
  emailChangeVerified,
  emailChangeVerifiedFailed,
  emailChangeVerifiedSuccess,
  passwordChanged,
  passwordChangedFailed,
  passwordChangedSuccess,
} from './settings.actions';

const NotificationTtl = 3000;

@Injectable()
export class SettingsEffects {
  public passwordChanged$ = createEffect(() =>
    this._actions$.pipe(
      ofType(passwordChanged),
      exhaustMap((action) =>
        this._authService.changePassword(action.oldPassword, action.newPassword).pipe(
          map(() => passwordChangedSuccess()),
          catchError((error) => of(passwordChangedFailed({ error })))
        )
      )
    )
  );

  public passwordChangedSuccess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(passwordChangedSuccess),
        tap(() => this._router.navigate(['settings'])),
        switchMap(() => this._showPasswordChangedNotification())
      ),
    { dispatch: false }
  );

  public passwordChangedFailed$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(passwordChangedFailed),
        switchMap(() => this._showPasswordChangedFailedNotification())
      ),
    { dispatch: false }
  );

  public emailChanged$ = createEffect(() =>
    this._actions$.pipe(
      ofType(emailChanged),
      exhaustMap((action) =>
        this._authService.changeEmail(action.email).pipe(
          map(() => emailChangedSuccess()),
          catchError((error) => of(emailChangedFailed({ error })))
        )
      )
    )
  );

  public emailChangedSuccess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(emailChangedSuccess),
        switchMap(() => this._showVerificationEmailSent())
      ),
    { dispatch: false }
  );

  public emailChangedFailed$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(emailChangedFailed),
        switchMap(() => this._showEmailChangedFailedNotification())
      ),
    { dispatch: false }
  );

  public emailChangeVerified$ = createEffect(() =>
    this._actions$.pipe(
      ofType(emailChangeVerified),
      exhaustMap((action) =>
        this._authService.verifyChangeEmail(action.code).pipe(
          map(() => emailChangeVerifiedSuccess()),
          catchError((error) => of(emailChangeVerifiedFailed({ error })))
        )
      )
    )
  );

  public emailChangeVerifiedSuccess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(emailChangeVerifiedSuccess),
        tap(() => this._router.navigate(['settings'])),
        switchMap(() => this._showEmailChanged())
      ),
    { dispatch: false }
  );

  constructor(
    private _actions$: Actions,
    private _router: Router,
    private _authService: AuthService,
    private _notifications: NotificationService
  ) {}

  private _showPasswordChangedNotification() {
    return this._notifications.createNotification$(
      {
        type: NotificationType.Success,
        title: 'Password successfully changed',
        closeable: true,
        ttl: NotificationTtl,
      },
      false
    );
  }

  private _showPasswordChangedFailedNotification() {
    return this._notifications.createNotification$(
      {
        type: NotificationType.Unavailable,
        title: 'Password change failed',
        closeable: true,
        ttl: NotificationTtl,
      },
      false
    );
  }

  private _showVerificationEmailSent() {
    return this._notifications.createNotification$(
      {
        type: NotificationType.Success,
        title: 'An email to verify you email address has been sent.',
        closeable: true,
        ttl: NotificationTtl,
      },
      false
    );
  }

  private _showEmailChanged() {
    return this._notifications.createNotification$(
      {
        type: NotificationType.Success,
        title: 'Email address has been changed successfully.',
        closeable: true,
        ttl: NotificationTtl,
      },
      false
    );
  }

  private _showEmailChangedFailedNotification() {
    return this._notifications.createNotification$(
      {
        type: NotificationType.Unavailable,
        title: 'Email change failed',
        closeable: true,
        ttl: NotificationTtl,
      },
      false
    );
  }
}
