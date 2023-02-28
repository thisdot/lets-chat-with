import { Injectable } from '@angular/core';
import {
  api,
  Candidate,
  GetMatchGQL,
  ListMatchesGQL,
  Match,
  MatchDetails,
  MatchDetailsFragment,
  MatchFragment,
  UpdateCandidateGQL,
  UpdateMatchInput,
} from '@conf-match/api';
import {
  conferencePollingAttempted,
  conferenceSelected,
  selectAttendeeId,
  selectConferenceId,
} from '@conf-match/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { combineLatest, forkJoin, Observable, of, throwError } from 'rxjs';
import {
  catchError,
  concatMap,
  filter,
  map,
  pairwise,
  startWith,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { ConnectAPIActions } from '@conf-match/client/conference/connect/data-access';
import { MatchesActions, MatchesAPIActions } from '../actions';
import { MatchesSelectors } from '../selectors';
import { ListCandidatesByAttendeeIdsGQL } from '@conf-match/api';
import { UpdateMatchGQL, DeleteMatchGQL } from '@conf-match/api';

const matchFragmentToMatch =
  (currentAttendeeId: string) =>
  ({
    id,
    attendee1,
    attendee2,
    createdAt,
    interests,
    desiredIdentifiers,
    viewedByAttendee1,
    viewedByAttendee2,
  }: MatchFragment): Match => ({
    id,
    attendee: [attendee1, attendee2].find((attendee) => attendee.id !== currentAttendeeId),
    attendee1Id: attendee1.id,
    attendee2Id: attendee2.id,
    createdAt,
    interests: interests.items,
    desiredIdentifiers: desiredIdentifiers.items,
    viewedByAttendee1,
    viewedByAttendee2,
  });

const matchFragmentToMatchDetails =
  (currentAttendeeId: string) =>
  ({ id, attendee1, attendee2 }: MatchDetailsFragment): MatchDetails => ({
    id,
    attendee: [attendee1, attendee2].find((attendee) => attendee.id !== currentAttendeeId),
  });

@Injectable({
  providedIn: 'root',
})
export class MatchesEffects {
  getMatch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MatchesAPIActions.getMatchAttempted),
      switchMap(({ id }) =>
        this.getMatchGQL.fetch({ id }, { fetchPolicy: 'network-only' }).pipe(
          withLatestFrom(
            this.store.select(selectAttendeeId).pipe(map(matchFragmentToMatchDetails))
          ),
          map(([result, toMatchDetails]) =>
            MatchesAPIActions.getMatchSuccessful({ match: toMatchDetails(result?.data?.getMatch) })
          ),
          catchError(() => of(MatchesAPIActions.getMatchFailed({ id })))
        )
      )
    )
  );

  listMatches$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        MatchesActions.matchesEffectsInitialized,
        MatchesActions.unmatchAttendeeSuccess,
        conferenceSelected,
        conferencePollingAttempted,
        ConnectAPIActions.attendeeDislikedSuccess,
        ConnectAPIActions.attendeeLikedSuccess
      ),
      switchMap((action) =>
        combineLatest([
          of(action),
          this.store.select(selectConferenceId).pipe(filter<string>(Boolean)),
          this.store.select(selectAttendeeId),
        ])
      ),
      switchMap(([action, conferenceId, attendeeId]) =>
        this.listMatchesGQL
          .fetch(
            {
              eventId: conferenceId,
            },
            {
              fetchPolicy: 'network-only',
              context: {
                ignoreSpinner: action.type === conferencePollingAttempted.type,
              },
            }
          )
          .pipe(
            map(({ data }) =>
              MatchesAPIActions.getMatchesSuccessful({
                matches: data.listMatches.items.map(matchFragmentToMatch(attendeeId)),
              })
            )
          )
      )
    )
  );

  matchesFetched$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MatchesAPIActions.getMatchesSuccessful),
      switchMap(() =>
        combineLatest([
          this.store.select(MatchesSelectors.selectMatches).pipe(startWith([]), pairwise()),
          this.store.select(MatchesSelectors.selectLastLikedAttendee).pipe(startWith(null)),
        ])
      ),
      switchMap(([[lastMatches, newMatches], likedAttendeeId]) => {
        return this.determineMatchCreatedActions(lastMatches, newMatches, likedAttendeeId);
      })
    )
  );

  unmatchAttendee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MatchesActions.unmatchAttendee),
      concatMap(({ requestingAttendeeId, otherAttendeeId, matchId }) =>
        this.getCandidateForAttendeePair(requestingAttendeeId, otherAttendeeId).pipe(
          concatMap((candidate) =>
            forkJoin([this.dislikeCandidate(candidate.id), this.deleteMatch(matchId)])
          ),
          catchError(() => {
            return of(MatchesActions.unmatchAttendeeFailed());
          })
        )
      ),
      map(() => MatchesActions.unmatchAttendeeSuccess())
    )
  );

  markMatchAsRead$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MatchesActions.markMatchAsRead),
      switchMap(({ matchId, attendeeId, attendee1Id, attendee2Id }) =>
        this.markMatchAsRead(matchId, attendeeId, attendee1Id, attendee2Id).pipe(
          catchError(() => of(MatchesActions.markMatchAsReadFailed()))
        )
      ),
      map(() => MatchesActions.markMatchAsReadSuccess())
    )
  );

  constructor(
    private actions$: Actions,
    private getMatchGQL: GetMatchGQL,
    private listMatchesGQL: ListMatchesGQL,
    private store: Store<any>,
    private listCandidatesByAttendeeIdsGQL: ListCandidatesByAttendeeIdsGQL,
    private updateCandidateGQL: UpdateCandidateGQL,
    private updateMatchGQL: UpdateMatchGQL,
    private deleteMatchGQL: DeleteMatchGQL
  ) {}

  ngrxOnInitEffects() {
    return MatchesActions.matchesEffectsInitialized();
  }

  private getCandidateForAttendeePair(
    ownerAttendeeId: string,
    otherAttendeeId: string
  ): Observable<Candidate> {
    return this.listCandidatesByAttendeeIdsGQL
      .fetch({ ownerAttendeeId, attendeeId: otherAttendeeId }, { fetchPolicy: 'network-only' })
      .pipe(
        map((data) => {
          if (data.data.listCandidates.items.length === 1) {
            return data.data.listCandidates.items[0];
          } else {
            throw Error(
              `Candidate not found for owning attendee ${ownerAttendeeId} and other attendee ${otherAttendeeId}`
            );
          }
        })
      );
  }

  private dislikeCandidate(candidateId: string): Observable<void> {
    return this.updateCandidateGQL
      .mutate({
        input: {
          id: candidateId,
          candidateType: api.CandidateType.DISLIKE,
        },
      })
      .pipe(map(() => null));
  }

  private markMatchAsRead(
    matchId: string,
    attendeeId: string,
    attendee1Id: string,
    attendee2Id: string
  ): Observable<void> {
    const input: UpdateMatchInput = { id: matchId };

    if (attendee1Id === attendeeId) {
      if (input.viewedByAttendee1) {
        return of(null);
      }
      input.viewedByAttendee1 = true;
    } else if (attendee2Id === attendeeId) {
      if (input.viewedByAttendee2) {
        return of(null);
      }
      input.viewedByAttendee2 = true;
    } else {
      return throwError(
        () =>
          new Error(
            `'attendeeId' with value '${attendeeId}' passed into 'markMatchAsRead' doesn't match any attendees in the accompanying match object with id '${matchId}'`
          )
      );
    }

    return this.updateMatchGQL.mutate({ input }).pipe(map(() => null));
  }

  private deleteMatch(matchId: string): Observable<void> {
    return this.deleteMatchGQL
      .mutate({
        input: {
          id: matchId,
        },
      })
      .pipe(map(() => null));
  }

  private determineMatchCreatedActions(
    lastMatches: Match[],
    newMatches: Match[],
    likedAttendeeId: string
  ): Action[] {
    const actions = [];

    if (lastMatches?.length < newMatches?.length) {
      const addedMatches = newMatches?.filter((m) => !lastMatches.some((lm) => lm.id === m.id));
      const newMatch = addedMatches?.find((m) => m.attendee2Id === likedAttendeeId);

      if (newMatch) {
        // the pair candidate already liked me, show "you are now chatters" message
        actions.push(
          MatchesActions.matchCreatedFromLike({
            newMatch,
          })
        );
      } else {
        // the pair candidate just liked me back, show "new match" popup
        actions.push(
          MatchesActions.matchCreatedFromPairLike({
            newPairMatch: addedMatches[0],
          })
        );
      }
    }

    return actions;
  }
}
