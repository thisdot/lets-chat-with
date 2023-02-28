import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Attendee, Candidate, CandidateType, Identifier, Interest, Match } from '@conf-match/api';
import {
  ConnectActions,
  ConnectSelectors,
} from '@conf-match/client/conference/connect/data-access';
import { MatchesSelectors } from '@conf-match/client/conference/matches/data-access';
import { MatchesActions } from '@conf-match/client/conference/messages/data-access';
import { selectAttendee } from '@conf-match/core';
import { ModalService, Storage } from '@conf-match/shared';
import { Store } from '@ngrx/store';
import { markMatchAsRead } from 'libs/client/conference/matches/data-access/src/lib/state/actions/matches.actions';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { OnboardingComponent } from './onboarding/onboarding.component';

// TODO: Decide where that key will be kept
const OnboardingStorageKey = 'cm-onboarding-completed';

interface ActionOnCandidate {
  candidate: Candidate;
  type: CandidateType;
}

@Component({
  selector: 'cm-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectComponent implements OnInit, OnDestroy {
  readonly currentCandidate$: Observable<Candidate> = this.store.select(
    ConnectSelectors.selectCurrentCandidate
  );
  readonly noMoreCandidates$: Observable<Boolean> = this.store.select(
    ConnectSelectors.selectNoCandidates
  );
  CandidateType = CandidateType;
  candidates$: Observable<Candidate[]> = this.store
    .select(ConnectSelectors.selectCandidates)
    .pipe(map((candidates) => candidates.filter((candidate) => !!candidate.attendee)));
  action: 'like' | 'confirmLike' | 'dislike' | 'undoLike' | 'undoDislike';
  private actionHistory: ActionOnCandidate[] = [];
  lastActionInHistory: ActionOnCandidate | null = null;
  isNewConnectionClosed = false;
  newMatch$ = this.store.select(MatchesSelectors.selectNewMatch);
  newPairMatch$ = combineLatest([
    this.store.select(MatchesSelectors.selectNewPairMatch),
    this.store.select(selectAttendee),
  ]).pipe(
    filter(
      ([pairMatch, attendee]) =>
        !(
          (pairMatch?.viewedByAttendee1 && pairMatch?.attendee1Id === attendee.id) ||
          (pairMatch?.viewedByAttendee2 && pairMatch?.attendee2Id === attendee.id)
        )
    )
  );
  private subscription: Subscription;

  constructor(
    private cdRef: ChangeDetectorRef,
    private store: Store<any>,
    private storage: Storage,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    if (!this.storage.getItem(OnboardingStorageKey)) {
      const ctrl = this.modalService.openBlankModal(OnboardingComponent);

      ctrl.onClose.pipe(take(1)).subscribe(() => {
        this.storage.setItem(OnboardingStorageKey, true);
      });
    }
    this.actionHistory = [];
  }

  private popActionFromHistory(): ActionOnCandidate | undefined {
    const action = this.actionHistory.pop();
    this.lastActionInHistory = this.actionHistory.length
      ? this.actionHistory[this.actionHistory.length - 1]
      : null;
    return action;
  }

  private pushActionToHistory(action: ActionOnCandidate) {
    this.actionHistory.push(action);
    this.lastActionInHistory = action;
  }

  onNewConnectionClose(match: Match, attendee: Attendee) {
    this.isNewConnectionClosed = true;
    this.store.dispatch(
      markMatchAsRead({
        matchId: match.id,
        attendeeId: attendee.id,
        attendee1Id: match.attendee1Id,
        attendee2Id: match.attendee2Id,
      })
    );
  }

  onNewConnectionChat(match: Match, attendee: Attendee) {
    this.store.dispatch(MatchesActions.startChatConversation({ matchId: match.id }));
    this.store.dispatch(
      markMatchAsRead({
        matchId: match.id,
        attendeeId: attendee.id,
        attendee1Id: match.attendee1Id,
        attendee2Id: match.attendee2Id,
      })
    );
  }

  undo() {
    this.cdRef.detectChanges();
    const undoneAction = this.popActionFromHistory();
    this.store.dispatch(
      ConnectActions.attendeeLikeDislikeUndone({
        id: undoneAction.candidate.id,
        initialType: undoneAction.type,
      })
    );
  }

  like(candidate: Candidate) {
    // enable new connection notification on likes
    this.isNewConnectionClosed = false;

    this.action = 'like';
    this.cdRef.detectChanges();
    this.pushActionToHistory({
      candidate,
      type: CandidateType.LIKE,
    });
  }

  confirmLike({
    id,
    identifiers,
    interests,
  }: {
    id: string;
    identifiers: Identifier[];
    interests: Interest[];
  }): void {
    this.store.dispatch(
      ConnectActions.attendeeLiked({
        id,
        identifiers,
        interests,
      })
    );
    this.action = 'confirmLike';
  }

  dislike(candidate: Candidate) {
    this.cdRef.detectChanges();
    this.pushActionToHistory({
      candidate,
      type: CandidateType.DISLIKE,
    });

    this.store.dispatch(
      ConnectActions.attendeeDisliked({
        id: candidate.id,
      })
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.store.dispatch(ConnectActions.reset());
  }

  trackByCandidate(index: number, candidate: Candidate): string {
    return candidate.id;
  }
}
