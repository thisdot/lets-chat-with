import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatThread, GQLCollection, Match, Message } from '@conf-match/api';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';

import {
  MessagesActions,
  MessagesSelectors,
} from '@conf-match/client/conference/messages/data-access';
import { selectAttendeeId, selectConferenceId } from '@conf-match/core';
import { ModalService } from '@conf-match/shared';
import {
  ConnectionActionMenuComponent,
  ConnectionActionMenuComponentInput,
} from '../../shared/connection-action-menu/connection-action-menu.component';

@Component({
  selector: 'cm-message-thread',
  templateUrl: './message-thread.component.html',
  styleUrls: ['./message-thread.component.scss'],
})
export class MessageThreadComponent implements OnInit, OnDestroy {
  thread$: Observable<ChatThread> = this.store.pipe(
    select(MessagesSelectors.selectChatThread),
    tap((thread) => {
      console.log(thread);
      if (!thread) {
        this.goToMessages();
      }
    })
  );
  match$: Observable<Match>;
  messages$: Observable<GQLCollection<Message>>;
  isLoading$: Observable<boolean>;

  attendeeId$ = this.store.pipe(select(selectAttendeeId));
  conferenceId: string;

  private threadId = this.activatedRoute.snapshot.paramMap.get('chatThreadId');
  readonly menuClickSubject = new Subject<Match>();
  private onDestroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService,
    private store: Store<any>
  ) {
    this.messages$ = this.store.pipe(select(MessagesSelectors.selectChatThreadMessages));
    this.match$ = this.store.pipe(select(MessagesSelectors.selectChatThreadInfo));
    this.isLoading$ = this.store.pipe(select(MessagesSelectors.selectIsLoadingMessages));

    this.menuClickSubject
      .asObservable()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((match) => {
        this.modalService.openDockedModal<void, ConnectionActionMenuComponentInput>(
          ConnectionActionMenuComponent,
          {
            reportedAttendee: match,
            isMatch: true,
            conferenceId: this.conferenceId,
          }
        );
      });
  }

  ngOnInit() {
    this.store.dispatch(
      MessagesActions.messageThreadSelected({
        chatThreadId: this.threadId,
      })
    );

    this.store
      .pipe(select(selectConferenceId), takeUntil(this.onDestroy$))
      .subscribe((conferenceId) => (this.conferenceId = conferenceId));
  }

  ngOnDestroy() {
    this.store.dispatch(MessagesActions.messageThreadClosed());
    this.onDestroy$.next();
  }

  onLoadNextPage() {
    this.store.dispatch(
      MessagesActions.getNextMessages({
        chatThreadId: this.threadId,
      })
    );
  }

  send(content) {
    this.store.dispatch(
      MessagesActions.sendMessage({
        content,
      })
    );
  }

  goToMessages() {
    this.router.navigate(['conferences', this.conferenceId, 'messages']);
  }

  updateAttendeeLastReadAt() {
    this.store.dispatch(MessagesActions.updateAttendeeLastReadAt({ chatThreadId: this.threadId }));
  }

  onMenu(match: Match) {
    this.menuClickSubject.next(match);
  }
}
