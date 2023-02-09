import { Component, OnDestroy } from '@angular/core';
import { ConferenceActions } from '@conf-match/client/conference/messages/data-access';
import {
  conferenceSelected,
  conferenceStartPolling,
  conferenceStopPolling,
} from '@conf-match/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'cm-conference',
  template: '<router-outlet></router-outlet>',
})
export class ConferenceComponent implements OnDestroy {
  constructor(private store: Store<any>) {
    this.store.dispatch(ConferenceActions.fetchThreadListAttempted());
    this.store.dispatch(conferenceStartPolling());
  }

  ngOnDestroy() {
    this.store.dispatch(conferenceStopPolling());
    this.store.dispatch(
      conferenceSelected({
        conferenceId: null,
      })
    );
  }
}
