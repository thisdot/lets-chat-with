import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccessEventGQL } from '@conf-match/api';
import { NotificationService, NotificationType } from '@conf-match/shared/ui-notifications';
import { TranslocoService } from '@ngneat/transloco';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import {
  conferenceJoinAttempted,
  conferenceJoinAttemptFailure,
  conferenceJoinAttemptNotExist,
  conferenceJoinAttemptSuccess,
  conferenceJoinDuplicated,
  conferenceQrScanAllowCamera,
  conferenceQrScanFailure,
} from './conference.actions';
import { ConferencesSelectors } from './conferences';

@Injectable()
export class ConferenceEffects {
  joinConference$ = createEffect(() =>
    this.actions$.pipe(
      ofType(conferenceJoinAttempted),
      withLatestFrom(this.store.select(ConferencesSelectors.selectAttendeeConferences)),
      switchMap(([{ letsChatWithUrl }, conferences]) =>
        conferences.find((conf) => conf.letsChatWithUrl === letsChatWithUrl)
          ? of(conferenceJoinDuplicated({ letsChatWithUrl }))
          : this.accessEventGQL
              .mutate({
                letsChatWithUrl,
              })
              .pipe(
                map((res) => res.data?.accessEvent),
                map((eventId) =>
                  eventId
                    ? conferenceJoinAttemptSuccess({ eventId })
                    : conferenceJoinAttemptNotExist()
                ),
                catchError(() => of(conferenceJoinAttemptFailure()))
              )
      )
    )
  );

  navigateToConference$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(conferenceJoinAttemptSuccess),
        tap(({ eventId }) => void this.router.navigate(['conferences', eventId, 'join']))
      ),
    { dispatch: false }
  );

  conferenceNotExistNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(conferenceJoinAttemptNotExist),
        tap(
          () =>
            void this.notifications.createNotification({
              // Todo: Add error type
              type: NotificationType.Unavailable,
              title: `Conference doesn't exist`,
              message: 'Please double-check the entered data',
            })
        )
      ),
    { dispatch: false }
  );

  conferenceDuplicatedNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(conferenceJoinDuplicated),
        tap(
          () =>
            void this.notifications.createNotification({
              // Todo: Add error type
              type: NotificationType.Unavailable,
              title: `You already joined this conference`,
              message: 'Please double-check the conference data',
            })
        )
      ),
    { dispatch: false }
  );

  conferenceJoinAttemptFailedNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(conferenceJoinAttemptFailure),
        switchMap(() => {
          const notification = this.notifications.createNotification({
            type: NotificationType.Unavailable,
            title: `Could not join conference`,
            message: 'Please double-check the entered data and try again',
          });
          return notification.closed;
        })
      ),
    { dispatch: false }
  );

  conferenceQrScanFailureNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(conferenceQrScanFailure),
        switchMap(() => {
          const notification = this.notifications.createNotification({
            type: NotificationType.Unavailable,
            ttl: 3000,
            title: this.translate.translate('conferences.join.byQR.failed'),
            message: this.translate.translate('conferences.join.byQR.error'),
          });
          return notification.closed;
        })
      ),
    { dispatch: false }
  );

  conferenceQrScanAllowCameraNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(conferenceQrScanAllowCamera),
        switchMap(() => {
          const notification = this.notifications.createNotification({
            type: NotificationType.Unavailable,
            ttl: 3000,
            title: this.translate.translate('conferences.join.byQR.allowCameraTitle'),
            message: this.translate.translate('conferences.join.byQR.allowCameraMessage'),
          });
          return notification.closed;
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private accessEventGQL: AccessEventGQL,
    private router: Router,
    private notifications: NotificationService,
    private translate: TranslocoService
  ) {}
}
