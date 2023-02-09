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
} from '@conf-match/api';
import {
  conferencePollingAttempted,
  conferenceSelected,
  selectAttendeeId,
  selectConferenceId,
} from '@conf-match/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { combineLatest, forkJoin, Observable, of } from 'rxjs';
import {
  catchError,
  concatMap,
  filter,
  map,
  pairwise,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { ConnectAPIActions } from '@conf-match/client/conference/connect/data-access';
import { MatchesActions, MatchesAPIActions } from '../actions';
import { MatchesSelectors } from '../selectors';
import { ListCandidatesByAttendeeIdsGQL } from '@conf-match/api';
import { DeleteMatchGQL } from '@conf-match/api';

const matchFragmentToMatch =
  (currentAttendeeId: string) =>
  ({
    id,
    attendee1,
    attendee2,
    createdAt,
    interests,
    desiredIdentifiers,
  }: MatchFragment): Match => ({
    id,
    attendee: [attendee1, attendee2].find((attendee) => attendee.id !== currentAttendeeId),
    attendee1Id: attendee1.id,
    attendee2Id: attendee2.id,
    createdAt,
    interests: interests.items,
    desiredIdentifiers: desiredIdentifiers.items,
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
          this.store.select(MatchesSelectors.selectMatches),
          this.store.select(MatchesSelectors.selectLastLikedAttendee),
        ])
      ),
      pairwise(),
      switchMap(([[lastMatches], [newMatches, likedAttendeeId]]) => {
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

  constructor(
    private actions$: Actions,
    private getMatchGQL: GetMatchGQL,
    private listMatchesGQL: ListMatchesGQL,
    private store: Store<any>,
    private listCandidatesByAttendeeIdsGQL: ListCandidatesByAttendeeIdsGQL,
    private updateCandidateGQL: UpdateCandidateGQL,
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
