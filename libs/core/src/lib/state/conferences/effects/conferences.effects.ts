import { Injectable } from '@angular/core';
import { EventModel, ListAttendeesGQL } from '@conf-match/api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, filter, map, pluck, switchMap, withLatestFrom } from 'rxjs/operators';
import { Conference } from '../../../models';
import { selectOwnerId } from '../../core.selectors';
import { ConferencesActions } from '../actions';

@Injectable()
export class ConferencesEffects {
  conferencesLoadAttempted$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ConferencesActions.conferencesLoadAttempted),
      withLatestFrom(this._store.select(selectOwnerId)),
      switchMap(([_, ownerId]) => this.extractConferencesFromAttendees(ownerId))
    )
  );

  constructor(
    private _actions$: Actions,
    private _store: Store,
    private _listAttendeesGQL: ListAttendeesGQL
  ) {}

  private extractConferencesFromAttendees(ownerId: string | undefined) {
    return this._listAttendeesGQL
      .fetch(
        {
          filter: {
            owner: {
              eq: ownerId,
            },
          },
        },
        {
          fetchPolicy: 'network-only',
        }
      )
      .pipe(
        filter((res) => !!res.data),
        map((result) => result?.data?.listAttendees),
        map((attendees) =>
          attendees.items.map((item: any) => ({
            ...item.event,
            matches: item.attendeeMatches,
            chats: item.attendeeChats,
          }))
        ),
        map((events) => this.convertEventsIntoConferences(events)),
        map((attendeeConferences) =>
          ConferencesActions.conferencesLoadSuccess({
            attendeeConferences,
          })
        ),
        catchError((error) =>
          of(
            ConferencesActions.conferencesLoadFailed({
              errors: [error.message],
            })
          )
        )
      );
  }

  private convertEventsIntoConferences(events: EventModel[]): Conference[] {
    return events.map(
      ({ id, name, description, logoUrl, letsChatWithUrl, qrImageUrl, matches }) => {
        return {
          id,
          letsChatWithUrl,
          // Keeping title property for backwards compatibility
          title: name,
          name: name,
          subTitle: description,
          logoUrl,
          qrImageUrl,
          matches: matches.length,
        } as Conference;
      }
    );
  }
}
