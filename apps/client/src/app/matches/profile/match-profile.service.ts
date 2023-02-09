import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Attendee } from '@conf-match/api';
import {
  MatchesAPIActions,
  MatchesSelectors,
} from '@conf-match/client/conference/matches/data-access';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, first, map, switchMap, tap } from 'rxjs/operators';
import { MatchesActions } from '@conf-match/client/conference/messages/data-access';

@Injectable()
export class MatchProfileService {
  readonly attendee$: Observable<Attendee> = this.activatedRoute.paramMap.pipe(
    map((paramMap) => paramMap.get('matchId')),
    distinctUntilChanged(),
    tap((id) => this.store.dispatch(MatchesAPIActions.getMatchAttempted({ id }))),
    switchMap((id) => this.store.select(MatchesSelectors.selectMatchAttendee(id))),
    filter<Attendee>(Boolean)
  );

  chatWith() {
    this.activatedRoute.paramMap
      .pipe(
        map((paramMap) => paramMap.get('matchId')),
        first()
      )
      .subscribe((matchId) => {
        this.store.dispatch(MatchesActions.startChatConversation({ matchId }));
      });
  }

  constructor(private activatedRoute: ActivatedRoute, private store: Store<any>) {}
}
