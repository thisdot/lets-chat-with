import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { conferenceSelected } from './store/actions/conference.actions';

@Injectable({
  providedIn: 'root',
})
export class ConferenceSelectedResolverService implements Resolve<string | void> {
  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot) {
    const conferenceId = route.paramMap.get('conferenceId');
    if (!conferenceId) {
      return;
    }

    this.store.dispatch(conferenceSelected({ conferenceId }));

    return conferenceId;
  }
}
