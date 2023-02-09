import { Injectable } from '@angular/core';
import { UpdateUserGQL } from '@conf-match/api';
import { NotificationService, NotificationType } from '@conf-match/shared/ui-notifications';
import { TranslocoService } from '@ngneat/transloco';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { retry } from '../operators/retry';
import { selectAppUser } from './core.selectors';
import {
  userNotificationConfigUpdated,
  userUpdatedFailed,
  userUpdatedSuccess,
} from './settings.actions';
import { filterNotNullOrUndefined } from '@conf-match/utilities';

@Injectable()
export class SettingsEffects {
  public toggledMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userNotificationConfigUpdated),
      debounceTime(1000),
      distinctUntilChanged(
        (previous, next) => JSON.stringify(previous.config) === JSON.stringify(next.config)
      ),
      withLatestFrom(this._store.select(selectAppUser).pipe(filterNotNullOrUndefined())),
      switchMap(([{ config }, user]) =>
        this._updateUserGQL
          .mutate({
            input: {
              id: user.id,
              notificationConfig: config,
            },
          })
          .pipe(
            retry(),
            map(({ data }) =>
              userUpdatedSuccess({
                user: data?.updateUser,
              })
            ),
            catchError(() => of(userUpdatedFailed({ user })))
          )
      )
    )
  );

  public userUpdatedSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userUpdatedSuccess),
        switchMap(() => this._showUserUpdateSuccessNotification())
      ),
    { dispatch: false }
  );

  public userUpdatedFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userUpdatedFailed),
        switchMap(() => this._showUserUpdateFailedNotification())
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private _updateUserGQL: UpdateUserGQL,
    private _store: Store<any>,
    private _notifications: NotificationService,
    private translate: TranslocoService
  ) {}

  private _showUserUpdateSuccessNotification() {
    return this.translate.selectTranslate('settings.messages.userUpdateSuccess').pipe(
      switchMap((title) =>
        this._notifications.createNotification$(
          {
            type: NotificationType.Success,
            title,
            closeable: true,
            ttl: 3000,
          },
          false
        )
      )
    );
  }

  private _showUserUpdateFailedNotification() {
    return this.translate.selectTranslate('settings.messages.userUpdateFailed').pipe(
      switchMap((title) =>
        this._notifications.createNotification$(
          {
            type: NotificationType.Unavailable,
            title,
            closeable: true,
            ttl: 3000,
          },
          false
        )
      )
    );
  }
}
