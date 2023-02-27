import { BreakpointObserver } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Candidate, CandidateType, Identifier, Interest } from '@conf-match/api';
import {
  ConnectActions,
  ConnectSelectors,
} from '@conf-match/client/conference/connect/data-access';
import { MatchesSelectors } from '@conf-match/client/conference/matches/data-access';
import { MatchesActions } from '@conf-match/client/conference/messages/data-access';
import { CmBreakpoints, ModalService, Storage } from '@conf-match/shared';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, pluck, take } from 'rxjs/operators';
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
  private isMobile$ = this.breakpointObserver.observe(CmBreakpoints.MD.DOWN).pipe(pluck('matches'));
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
  newPairMatch$ = this.store.select(MatchesSelectors.selectNewPairMatch);
  private subscription: Subscription;

  constructor(
    private cdRef: ChangeDetectorRef,
    private store: Store<any>,
    private storage: Storage,
    private modalService: ModalService,
    private breakpointObserver: BreakpointObserver
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

  onNewConnectionClose() {
    this.isNewConnectionClosed = true;
  }

  onNewConnectionChat(matchId: string) {
    this.store.dispatch(MatchesActions.startChatConversation({ matchId }));
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
