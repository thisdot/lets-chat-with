import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChatThread, GQLCollection, Message, MatchAttendee } from '@conf-match/api';
import { Store, select } from '@ngrx/store';

import { selectConferenceId, selectAttendeeId } from '@conf-match/core';
import {
  MessagesSelectors,
  MessagesActions,
} from '@conf-match/client/conference/messages/data-access';

@Component({
  selector: 'cm-message-thread',
  templateUrl: './message-thread.component.html',
  styleUrls: ['./message-thread.component.scss'],
})
export class MessageThreadComponent implements OnInit, OnDestroy {
  thread$: Observable<ChatThread>;
  matchAttendee$: Observable<MatchAttendee>;
  messages$: Observable<GQLCollection<Message>>;
  isLoading$: Observable<boolean>;

  attendeeId$ = this.store.pipe(select(selectAttendeeId));
  conferenceId: string;

  private threadId: string;
  private onDestroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<any>
  ) {
    this.threadId = this.activatedRoute.snapshot.paramMap.get('chatThreadId');
    this.thread$ = this.store.pipe(select(MessagesSelectors.selectChatThread));
    this.messages$ = this.store.pipe(select(MessagesSelectors.selectChatThreadMessages));
    this.matchAttendee$ = this.store.pipe(select(MessagesSelectors.selectChatThreadAttendee));
    this.isLoading$ = this.store.pipe(select(MessagesSelectors.selectIsLoadingMessages));
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
}
