import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GetAttendeeGQL, UpdateAttendeeGQL } from '@conf-match/api';
import {
  attendeeRetrieved,
  editingDesiredIdentifiersSaved,
  editingDesiredIdentifiersSavedFailed,
  editingDesiredIdentifiersSavedSuccess,
  editingOwnIdentifiersSaved,
  editingOwnIdentifiersSavedFailed,
  editingOwnIdentifiersSavedSuccess,
  editingInterestsSaved,
  editingInterestsSavedFailed,
  editingInterestsSavedSuccess,
  profileOpened,
  savingProfileFailed,
  savingProfileStarted,
  savingProfileSuccess,
  selectAttendeeId,
  selectConferenceId,
} from '@conf-match/core';
import { NotificationService, NotificationType } from '@conf-match/shared/ui-notifications';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';

import { catchError, concatMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

const NotificationTtl = 3000;

@Injectable()
export class ProfileEffects {
  public profileOpened$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileOpened),
      concatMap((action) =>
        of(action).pipe(withLatestFrom(this._store.pipe(select(selectAttendeeId))))
      ),
      switchMap(([, id]) =>
        this._getAttendeeGQL
          .fetch({
            id,
          })
          .pipe(map((result) => result?.data?.getAttendee))
      ),
      map((x) =>
        attendeeRetrieved({
          attendee: x,
        })
      )
    )
  );

  public savingProfileStarted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(savingProfileStarted),
      switchMap(({ input }) =>
        this._updateAttendeeGQL.mutate({
          input: {
            id: input.id,
            fullName: input.fullName,
            avatarUrl: input.avatarUrl,
            title: input.title,
            company: input.company,
            pronouns: input.pronouns,
            bio: input.bio,
            linkedin: input.linkedin,
            facebook: input.facebook,
            twitter: input.twitter,
          },
        })
      ),
      switchMap((updateAttendeeResponse) => this.fetchAttendeeAfterUpdate(updateAttendeeResponse)),
      map((attendee) => savingProfileSuccess({ attendee })),
      catchError((error) => of(savingProfileFailed(error)))
    )
  );

  public savingProfileSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(savingProfileSuccess),
        withLatestFrom(this._store.pipe(select(selectConferenceId))),
        tap(([, conferenceId]) => {
          this._router.navigate(['/conferences', conferenceId, 'profile']);
        }),
        switchMap(() => this._showEditProfileSuccessNotification())
      ),
    { dispatch: false }
  );

  public savingProfileFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(savingProfileFailed),
        switchMap(() => this._showEditProfileFailedNotification())
      ),
    { dispatch: false }
  );

  public editingInterestsSaved$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editingInterestsSaved),
      switchMap((action) =>
        this._updateAttendeeGQL.mutate({
          input: {
            id: action.attendeeId,
            updatedAt: new Date().toISOString(),
            interests: action.interests.map((interest) => interest.id),
          },
        })
      ),
      switchMap((updateAttendeeResponse) => this.fetchAttendeeAfterUpdate(updateAttendeeResponse)),
      map((attendee) => editingInterestsSavedSuccess({ attendee })),
      catchError((error) => of(editingInterestsSavedFailed(error)))
    )
  );

  public editingInterestsSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(editingInterestsSavedSuccess),
        switchMap(() => this._showEditInterestsSuccessNotification())
      ),
    { dispatch: false }
  );

  public editingInterestsFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(editingInterestsSavedFailed),
        switchMap(() => this._showEditInterestsFailedNotification())
      ),
    { dispatch: false }
  );

  public editingDesiredIdentifiersSaved$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editingDesiredIdentifiersSaved),
      switchMap((action) =>
        this._updateAttendeeGQL.mutate({
          input: {
            id: action.attendeeId,
            updatedAt: new Date().toISOString(),
            desiredIdentifiers: action.desiredIdentifiers.map((identifier) => identifier.id),
          },
        })
      ),
      switchMap((updateAttendeeResponse) => this.fetchAttendeeAfterUpdate(updateAttendeeResponse)),
      map((attendee) => editingDesiredIdentifiersSavedSuccess({ attendee })),
      catchError((error) => of(editingDesiredIdentifiersSavedFailed(error)))
    )
  );

  public editingDesiredIdentifiersSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(editingDesiredIdentifiersSavedSuccess),
        switchMap(() => this._showEditConnectionsSuccessNotification())
      ),
    { dispatch: false }
  );

  public editingDesiredIdentifiersFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(editingDesiredIdentifiersSavedFailed),
        switchMap(() => this._showEditConnectionsFailedNotification())
      ),
    { dispatch: false }
  );

  public editingOwnIdentifiersSaved$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editingOwnIdentifiersSaved),
      switchMap((action) =>
        this._updateAttendeeGQL.mutate({
          input: {
            id: action.attendeeId,
            updatedAt: new Date().toISOString(),
            ownIdentifiers: action.ownIdentifiers.map((identifier) => identifier.id),
          },
        })
      ),
      switchMap((updateAttendeeResponse) => this.fetchAttendeeAfterUpdate(updateAttendeeResponse)),
      map((attendee) => editingOwnIdentifiersSavedSuccess({ attendee })),
      catchError((error) => of(editingOwnIdentifiersSavedFailed(error)))
    )
  );

  public editingOwnIdentifiersSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(editingOwnIdentifiersSavedSuccess),
        switchMap(() => this._showEditIdentifiersSuccessNotification())
      ),
    { dispatch: false }
  );

  public editingOwnIdentifiersFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(editingOwnIdentifiersSavedFailed),
        switchMap(() => this._showEditIdentifiersFailedNotification())
      ),
    { dispatch: false }
  );

  constructor(
    private _store: Store<any>,
    private actions$: Actions,
    private _getAttendeeGQL: GetAttendeeGQL,
    private _updateAttendeeGQL: UpdateAttendeeGQL,
    private _router: Router,
    private _notifications: NotificationService
  ) {}

  private fetchAttendeeAfterUpdate(updateAttendeeResponse: any) {
    return this._getAttendeeGQL
      .fetch(
        {
          id: updateAttendeeResponse.data.updateAttendee.id,
        },
        { fetchPolicy: 'network-only' }
      )
      .pipe(map((getAttendeeResponse) => getAttendeeResponse.data.getAttendee));
  }

  private _showEditProfileSuccessNotification() {
    return this._notifications.createNotification$(
      {
        type: NotificationType.Success,
        title: 'Profile successfully updated',
        closeable: true,
        ttl: NotificationTtl,
      },
      false
    );
  }

  private _showEditProfileFailedNotification() {
    return this._notifications.createNotification$(
      {
        type: NotificationType.Unavailable,
        title: 'Update profile failed',
        closeable: true,
        ttl: NotificationTtl,
      },
      false
    );
  }

  private _showEditInterestsSuccessNotification() {
    return this._notifications.createNotification$(
      {
        type: NotificationType.Success,
        title: 'Successfully updated interests',
        closeable: true,
        ttl: NotificationTtl,
      },
      false
    );
  }

  private _showEditInterestsFailedNotification() {
    return this._notifications.createNotification$(
      {
        type: NotificationType.Unavailable,
        title: 'Failed to update interests',
        closeable: true,
        ttl: NotificationTtl,
      },
      false
    );
  }

  private _showEditConnectionsSuccessNotification() {
    return this._notifications.createNotification$(
      {
        type: NotificationType.Success,
        title: 'Successfully updated connections',
        closeable: true,
        ttl: NotificationTtl,
      },
      false
    );
  }

  private _showEditConnectionsFailedNotification() {
    return this._notifications.createNotification$(
      {
        type: NotificationType.Unavailable,
        title: 'Failed to update connections',
        closeable: true,
        ttl: NotificationTtl,
      },
      false
    );
  }

  private _showEditIdentifiersSuccessNotification() {
    return this._notifications.createNotification$(
      {
        type: NotificationType.Success,
        title: 'Successfully updated who I am',
        closeable: true,
        ttl: NotificationTtl,
      },
      false
    );
  }

  private _showEditIdentifiersFailedNotification() {
    return this._notifications.createNotification$(
      {
        type: NotificationType.Unavailable,
        title: 'Failed to update who I am',
        closeable: true,
        ttl: NotificationTtl,
      },
      false
    );
  }
}
