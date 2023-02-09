import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Match } from '@conf-match/api';
import { ModalService } from '@conf-match/shared';
import { Store } from '@ngrx/store';
import { selectConferenceId } from '@conf-match/core';
import {
  ConnectionActionMenuComponent,
  ConnectionActionMenuComponentInput,
} from '../shared/connection-action-menu/connection-action-menu.component';
import { MatchesActions as MessageActions } from '@conf-match/client/conference/messages/data-access';
import { MatchesSelectors } from '@conf-match/client/conference/matches/data-access';
import { takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'cm-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
})
export class MatchesComponent implements OnDestroy {
  matches$ = this.store.select(MatchesSelectors.selectMatches);
  conferenceId$ = this.store.select(selectConferenceId);

  readonly menuClickSubject = new Subject<Match>();
  readonly destroySubject = new Subject<void>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService,
    private store: Store<any>
  ) {
    this.menuClickSubject
      .asObservable()
      .pipe(withLatestFrom(this.conferenceId$), takeUntil(this.destroySubject))
      .subscribe(([match, conferenceId]) => {
        this.modalService.openDockedModal<void, ConnectionActionMenuComponentInput>(
          ConnectionActionMenuComponent,
          {
            reportedAttendee: match,
            isMatch: true,
            conferenceId: conferenceId,
          }
        );
      });
  }

  onInfo(match) {
    this.router.navigate([match.id], {
      relativeTo: this.activatedRoute,
    });
  }

  onChat(match: Match) {
    this.store.dispatch(MessageActions.startChatConversation({ matchId: match.id }));
  }

  onMenu(match: Match) {
    this.menuClickSubject.next(match);
  }

  ngOnDestroy() {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
