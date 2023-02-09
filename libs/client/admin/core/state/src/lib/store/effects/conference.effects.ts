import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { catchError, filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';

import { ListEventsGQL } from '@conf-match/api';

import {
  conferenceEffectsInitialized,
  conferencesLoadAttempted,
  conferencesLoadedSuccess,
  conferencesLoadFailed,
} from '../actions/conference.actions';
import { Event } from '@conf-match/api';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectConferenceId, selectConferences } from '../selectors/conference.selectors';

@Injectable()
export class ConferencesEffects implements OnInitEffects {
  public loadConferences$ = createEffect(() =>
    this.actions$.pipe(
      ofType(conferencesLoadAttempted),
      mergeMap(() =>
        this.listEventsGQL.fetch({
          fetchPolicy: 'network-only',
        })
      ),
      map((listEventsResponse) =>
        listEventsResponse.data.listEvents.items.map((conference: Event) => conference)
      ),
      map((conferences) => conferencesLoadedSuccess({ conferences })),
      catchError((e) => {
        console.error(e);
        return of(conferencesLoadFailed());
      })
    )
  );

  public conferencesLoaded$ = createEffect(() =>
    combineLatest([
      this.store.select(selectConferences),
      this.store.select(selectConferenceId),
    ]).pipe(
      filter(([conferences]) => conferences?.length > 0),
      switchMap(([conferences, conferenceId]) => {
        if (!conferenceId) {
          conferenceId = conferences[0].id;
        }
        this.router.navigate(['reports', conferenceId]);
        return of(conferencesLoadedSuccess({ conferences }));
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly listEventsGQL: ListEventsGQL,
    private readonly router: Router,
    private readonly store: Store
  ) {}

  ngrxOnInitEffects() {
    return conferenceEffectsInitialized();
  }
}
