import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { CreateAttendeeGQL, GetEventGQL } from '@conf-match/api';
import { filterNotNullOrUndefined } from '@conf-match/utilities';
import { NotificationService, NotificationType } from '@conf-match/shared/ui-notifications';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, of, timer } from 'rxjs';

import {
  catchError,
  filter,
  map,
  mapTo,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import {
  checkLoginStatusFailed,
  checkLoginStatusSuccess,
  postSignupLoginSuccess,
  userLoginSuccess,
  userLogoutSuccess,
} from './amplify.actions';
import {
  conferencePollingAttempted,
  conferenceRetrievedFailed,
  conferenceRetrievedSuccess,
  conferenceSelected,
  conferenceStartPolling,
  conferenceStopPolling,
  coreEffectsInitialized,
  joinConferenceAttempted,
  joinConferenceFailed,
  joinConferenceSuccess,
} from './core.actions';
import { selectConferenceId, selectOwnerId, selectUserId } from './core.selectors';

export const CM_CONFERENCE_POLLING_INTERVAL = new InjectionToken('CM_CONFERENCE_POLLING_INTERVAL');

@Injectable()
export class CoreEffects implements OnInitEffects {
  public conferenceSelected$ = createEffect(() =>
    this._actions$.pipe(
      ofType(conferenceSelected, conferencePollingAttempted),
      filter(({ conferenceId }) => !!conferenceId),
      switchMap(({ conferenceId, type }) =>
        this._getEvent
          .fetch(
            {
              id: conferenceId,
            },
            {
              fetchPolicy: 'network-only',
              context: {
                ignoreSpinner: type === conferencePollingAttempted.type,
              },
            }
          )
          .pipe(
            map((result) =>
              conferenceRetrievedSuccess({
                conference: result?.data?.getEvent,
              })
            ),
            catchError((error) => of(conferenceRetrievedFailed({ error })))
          )
      )
    )
  );

  public conferenceStartPolling$ = createEffect(() =>
    this._actions$.pipe(
      ofType(conferenceStartPolling),
      withLatestFrom(this._store.select(selectConferenceId).pipe(filterNotNullOrUndefined())),
      switchMap(([startPolling, conferenceId]) => {
        return timer(this.pollingInterval, this.pollingInterval).pipe(
          takeUntil(
            this._actions$.pipe(
              ofType(conferenceStopPolling),
              withLatestFrom(this._store.select(selectConferenceId)),
              filter(([stopPolling, stopConferenceId]) => conferenceId === stopConferenceId)
            )
          ),
          mapTo(conferencePollingAttempted({ conferenceId }))
        );
      })
    )
  );

  public joinConference$ = createEffect(() =>
    this._actions$.pipe(
      ofType(joinConferenceAttempted),
      withLatestFrom(
        this._store.select(selectUserId).pipe(filterNotNullOrUndefined()),
        this._store.select(selectOwnerId).pipe(filterNotNullOrUndefined())
      ),
      switchMap(([action, userId, ownerId]) =>
        this._createAttendeeGQL
          .mutate({
            input: {
              userId: userId,
              owner: ownerId,
              fullName: action.fullName,
              title: action.title,
              company: action.company,
              pronouns: action.pronouns,
              newsletterSubscribed: action.newsletterSubscribed,
              linkedin: action.linkedin,
              facebook: action.facebook,
              twitter: action.twitter,
              avatarUrl: action.avatarUrl,
              ownIdentifiers: action.identifiers,
              desiredIdentifiers: action.connections,
              interests: action.interests,
              bio: action.bio,
              eventId: action.conferenceId,
            },
          })
          .pipe(
            map(() => joinConferenceSuccess({ conferenceId: action.conferenceId })),
            catchError(() => of(joinConferenceFailed()))
          )
      )
    )
  );

  public joinConferenceSuccess$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(joinConferenceSuccess),
        tap((action) => this._router.navigate(['/conferences', action.conferenceId, 'connect']))
      );
    },
    { dispatch: false }
  );

  public joinConferenceFailed$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(joinConferenceFailed),
        tap(() => {
          this._router.navigate(['/conferences']);
          this._notifications.createNotification({
            // To-do: Change to error type in future
            type: NotificationType.Unavailable,
            title: 'Unable to join',
            message: 'We are sorry for the inconvenience. Please, try again later',
          });
        })
      );
    },
    { dispatch: false }
  );

  public readAuthUser$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(coreEffectsInitialized),
      switchMap(() => {
        return of(null).pipe(
          map((_) => JSON.parse(localStorage.getItem('user') ?? '') || null),
          map((user) => userLoginSuccess({ user })),
          catchError((_) => of(userLogoutSuccess({ route: ['/signin'] })))
        );
      })
    );
  });

  public setAuthUser$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(userLoginSuccess, checkLoginStatusSuccess, postSignupLoginSuccess),
        switchMap((action) => {
          return of(null).pipe(
            tap(() => void localStorage.setItem('user', JSON.stringify(action.user))),
            catchError(() => EMPTY)
          );
        })
      );
    },
    { dispatch: false }
  );

  public clearAuthUser$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(userLogoutSuccess, checkLoginStatusFailed),
        tap((_) => void localStorage.removeItem('user'))
      );
    },
    { dispatch: false }
  );

  constructor(
    private _actions$: Actions,
    private _router: Router,
    private _store: Store<{}>,
    private _notifications: NotificationService,
    private _getEvent: GetEventGQL,
    private _createAttendeeGQL: CreateAttendeeGQL,
    @Inject(CM_CONFERENCE_POLLING_INTERVAL) @Optional() private pollingInterval: number
  ) {
    this.pollingInterval = this.pollingInterval || 10000;
  }

  ngrxOnInitEffects() {
    return coreEffectsInitialized();
  }
}
