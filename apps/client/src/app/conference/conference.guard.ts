import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ListAttendeesGQL } from '@conf-match/api';
import { filter, map, switchMap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { attendeeLoaded, selectOwnerId } from '@conf-match/core';

@Injectable({
  providedIn: 'root',
})
export class ConferenceGuard {
  constructor(
    private _router: Router,
    private _listAttendeesGQL: ListAttendeesGQL,
    private _store: Store<any>
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const eventId = route.paramMap.get('conferenceId');
    return this._store.pipe(
      select(selectOwnerId),
      switchMap((userId) => this.getAttendee(eventId, userId)),
      map((attendee) => {
        if (attendee) {
          this._store.dispatch(attendeeLoaded({ attendee }));
          return true;
        } else {
          return this._router.parseUrl('/conferences');
        }
      })
    );
  }

  private getAttendee(eventId, ownerId) {
    return this._listAttendeesGQL
      .fetch(
        {
          filter: {
            and: [
              {
                eventId: {
                  eq: eventId,
                },
                owner: {
                  eq: ownerId,
                },
              },
            ],
          },
        },
        {
          fetchPolicy: 'network-only',
        }
      )
      .pipe(
        filter((res) => !!res.data),
        map((res) => res.data.listAttendees),
        map((attendees) => attendees.items),
        map((attendees) => attendees.find((item) => item.eventId === eventId))
      );
  }
}
