import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  concatMap,
  filter,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { api, CandidatesByEventGQL, ModelSortDirection, UpdateCandidateGQL } from '@conf-match/api';
import {
  conferencePollingAttempted,
  conferenceSelected,
  joinConferenceSuccess,
  selectConferenceId,
} from '@conf-match/core';
import { ConnectActions, ConnectAPIActions } from '../actions';
import { Store } from '@ngrx/store';
import { filterNotNullOrUndefined } from '@conf-match/utilities';
import { selectAttendeeId } from '@conf-match/core';

@Injectable({
  providedIn: 'root',
})
export class ConnectEffects {
  listCandidates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(conferenceSelected, conferencePollingAttempted, joinConferenceSuccess),
      withLatestFrom(this.store.select(selectAttendeeId)),
      filter(([{ conferenceId }, attendeeId]) => !!conferenceId && !!attendeeId),
      switchMap(([{ conferenceId, type }, attendeeId]) =>
        this.getCandidatesByEvent(
          conferenceId,
          attendeeId as string,
          type === conferencePollingAttempted.type
        ).pipe(
          map(({ data }) =>
            ConnectAPIActions.getCandidatesSuccessful({
              candidates: data.candidatesByEventId.items,
              eventId: conferenceId,
            })
          )
        )
      )
    )
  );

  refreshCandidateListAfterUpdatingCandidate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ConnectAPIActions.attendeeLikedSuccess,
        ConnectAPIActions.attendeeDislikedSuccess,
        ConnectAPIActions.attendeeLikeDislikeUndoneSuccess
      ),
      switchMap(() => this.store.select(selectConferenceId)),
      filterNotNullOrUndefined(),
      withLatestFrom(this.store.select(selectAttendeeId)),
      switchMap(([conferenceId, attendeeId]) =>
        this.getCandidatesByEvent(conferenceId, attendeeId as string).pipe(
          map(({ data }) =>
            ConnectAPIActions.getCandidatesSuccessful({
              candidates: data.candidatesByEventId.items,
              eventId: conferenceId,
            })
          )
        )
      )
    )
  );

  attendeeLiked$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConnectActions.attendeeLiked),
      mergeMap(({ id, identifiers, interests }) =>
        this.updateCandidateGQL
          .mutate({
            input: {
              id,
              candidateType: api.CandidateType.LIKE,
              interests: interests.map((int) => int.id),
              desiredIdentifiers: identifiers.map((ide) => ide.id),
            },
          })
          .pipe(
            concatMap(({ data }) => [
              ConnectAPIActions.attendeeLikedSuccess({
                candidate: data?.updateCandidate,
              }),
              ConnectAPIActions.createLike({
                likedAttendeeId: data?.updateCandidate.attendeeId,
              }),
            ]),
            catchError(() =>
              of(
                ConnectAPIActions.attendeeLikedFailed({
                  id,
                })
              )
            )
          )
      )
    )
  );

  attendeeDisliked$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConnectActions.attendeeDisliked),
      mergeMap(({ id }) =>
        this.updateCandidateGQL
          .mutate({
            input: {
              id,
              candidateType: api.CandidateType.DISLIKE,
            },
          })
          .pipe(
            map(({ data }) =>
              ConnectAPIActions.attendeeDislikedSuccess({
                candidate: data?.updateCandidate,
              })
            ),
            catchError(() =>
              of(
                ConnectAPIActions.attendeeDislikedFailed({
                  id,
                })
              )
            )
          )
      )
    )
  );

  attendeeLikeDislikeUndone$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConnectActions.attendeeLikeDislikeUndone),
      map(({ id, initialType }) =>
        ConnectActions.attendeeLikeDislikeUndoneStarted({
          id,
          initialType,
        })
      )
    )
  );

  attendeeLikeDislikeUndoneStarted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConnectActions.attendeeLikeDislikeUndoneStarted),
      mergeMap(({ id, initialType }) =>
        this.updateCandidateGQL
          .mutate({
            input: {
              id,
              candidateType: api.CandidateType.UNDECIDED,
            },
          })
          .pipe(
            map(({ data }) =>
              ConnectAPIActions.attendeeLikeDislikeUndoneSuccess({
                candidate: data?.updateCandidate,
              })
            ),
            catchError(() =>
              of(
                ConnectAPIActions.attendeeLikeDislikeUndoneFailed({
                  id,
                  initialType,
                })
              )
            )
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private candidatesByEventGQL: CandidatesByEventGQL,
    private updateCandidateGQL: UpdateCandidateGQL,
    private store: Store
  ) {}

  private getCandidatesByEvent(eventId: string, ownerAttendeeId: string, ignoreSpinner = false) {
    return this.candidatesByEventGQL.fetch(
      {
        eventId: eventId,
        ownerAttendeeId: ownerAttendeeId,
        sortDirection: ModelSortDirection.DESC,
      },
      {
        fetchPolicy: 'no-cache',
        context: {
          ignoreSpinner: ignoreSpinner,
        },
      }
    );
  }
}
