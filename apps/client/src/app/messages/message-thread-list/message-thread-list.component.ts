import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { selectConferenceId } from '@conf-match/core';
import {
  MessagesSelectors,
  MessageThreadListActions,
} from '@conf-match/client/conference/messages/data-access';

@Component({
  selector: 'cm-message-thread-list',
  templateUrl: './message-thread-list.component.html',
  styleUrls: ['./message-thread-list.component.scss'],
})
export class MessageThreadListComponent implements OnInit, OnDestroy {
  conferenceId: string;

  filteredMessageThreads$ = this._store.pipe(
    select(MessagesSelectors.selectFilteredChatThreadList)
  );

  private _onDestroy$ = new Subject<void>();

  constructor(private _router: Router, private _store: Store<any>) {}

  ngOnInit() {
    this._store.dispatch(MessageThreadListActions.messageThreadListOpened());
    this._store
      .pipe(select(selectConferenceId), takeUntil(this._onDestroy$))
      .subscribe((conferenceId) => (this.conferenceId = conferenceId));
  }

  ngOnDestroy() {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  onSearch(term: string) {
    this._store.dispatch(MessageThreadListActions.messageThreadListSearched({ term }));
  }
}
