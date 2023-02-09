import { Component } from '@angular/core';
import { conferencePollingAttempted } from '@conf-match/core';
import { Actions, ofType } from '@ngrx/effects';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { MatchesAPIActions } from '@conf-match/client/conference/matches/data-access';
import { ConnectAPIActions } from '@conf-match/client/conference/connect/data-access';

@Component({
  selector: 'cm-no-results',
  templateUrl: './no-results.component.html',
  styleUrls: ['./no-results.component.scss'],
})
export class NoResultsComponent {
  isPolling$ = this.actions.pipe(
    ofType(
      conferencePollingAttempted,
      MatchesAPIActions.getMatchesSuccessful,
      ConnectAPIActions.getCandidatesSuccessful
    ),
    map(({ type }) => type === conferencePollingAttempted.type),
    distinctUntilChanged()
  );

  constructor(private actions: Actions) {}
}
