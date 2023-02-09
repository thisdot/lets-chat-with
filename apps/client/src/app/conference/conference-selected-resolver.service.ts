import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ApiEvent } from '@conf-match/api';
import { conferenceSelected, selectConference } from '@conf-match/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';

@Injectable()
export class ConferenceSelectedResolverService implements Resolve<any> {
  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ApiEvent> {
    const conferenceId = route.paramMap.get('conferenceId');
    if (!conferenceId) {
      return;
    }

    this.store.dispatch(conferenceSelected({ conferenceId }));

    return this.store.select(selectConference).pipe(filter<ApiEvent>(Boolean), first());
  }
}
