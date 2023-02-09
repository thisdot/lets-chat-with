import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ListAttendeesGQL } from '@conf-match/api';
import { filter, map, mergeMap, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { selectOwnerId } from '@conf-match/core';

@Injectable({
  providedIn: 'root',
})
export class JoinConferenceGuard {
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
      take(1),
      mergeMap((ownerId) =>
        this._listAttendeesGQL.fetch({
          filter: {
            eventId: {
              eq: eventId,
            },
            owner: {
              eq: ownerId,
            },
          },
        })
      ),
      filter((res) => !!res.data),
      map((res) => res.data.listAttendees),
      map((attendees) => attendees.items.map((item) => item.event)),
      map((events) => events.find((event) => event.id === eventId)),
      map((event) => {
        if (event) {
          return this._router.parseUrl(`/conferences/${event.id}/connect`);
        } else {
          return true;
        }
      })
    );
  }
}
