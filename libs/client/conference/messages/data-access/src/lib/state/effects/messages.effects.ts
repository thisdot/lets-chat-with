import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
  catchError,
  concatMap,
  exhaustMap,
  filter,
  map,
  mergeMap,
  pluck,
  switchMap,
  take,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import {
  MatchesActions,
  MessageAPIActions,
  MessagesActions,
  MessageThreadListActions,
  ConferenceActions,
} from '../actions';
import {
  CreateMessageGQL,
  GetChatThreadGQL,
  OnCreateMessageGQL,
  ListChatThreadsGQL,
  UpdateChatThreadGQL,
} from '@conf-match/api';
import { select, Store } from '@ngrx/store';
import { MessagesSelectors } from '../selectors';
import { of } from 'rxjs';
import { conferencePollingAttempted, selectAttendeeId, selectConferenceId } from '@conf-match/core';
import { Router } from '@angular/router';

@Injectable()
export class MessagesEffects {
  getChatThread$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.messageThreadSelected),
      filter((action) => !!action.chatThreadId),
      switchMap((action) =>
        this.getChatThreadGQL
          .fetch(
            {
              id: action.chatThreadId,
              limit: 30,
            },
            {
              fetchPolicy: 'network-only',
            }
          )
          .pipe(
            map((result) => result?.data?.getChatThread),
            map((chatThread) =>
              MessageAPIActions.getMessageThreadSuccess({
                chatThread,
              })
            )
          )
      )
    )
  );

  getNextThreadMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.getNextMessages),
      withLatestFrom(this.store.pipe(select(MessagesSelectors.selectMessagesNextToken))),
      filter(([, nextToken]) => !!nextToken),
      map(([action, nextToken]) =>
        MessageAPIActions.getNextMessagesStarted({
          chatThreadId: action.chatThreadId,
          nextToken,
        })
      )
    )
  );

  getNextMessagesStarted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessageAPIActions.getNextMessagesStarted),
      exhaustMap(({ chatThreadId, nextToken }) =>
        this.getChatThreadGQL
          .fetch(
            {
              id: chatThreadId,
              limit: '30',
              nextToken,
            },
            {
              fetchPolicy: 'network-only',
            }
          )
          .pipe(
            map((result) => result?.data?.getChatThread),
            map((chatThread) =>
              MessageAPIActions.getNextMessagesSuccess({
                chatThread,
              })
            )
          )
      )
    )
  );

  updateChatThreadLastMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessageAPIActions.updateChatThreadLastMessageAt),
      concatMap(({ chatThreadId, lastCreatedMessageDate }) =>
        this.updateChatThreadGQL
          .mutate({
            input: {
              id: chatThreadId,
              lastMessageAt: lastCreatedMessageDate,
            },
          })
          .pipe(map(() => MessageAPIActions.updateChatThreadLastMessageAtSuccess()))
      )
    )
  );

  updateAttendeeLastReadAt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.updateAttendeeLastReadAt),
      withLatestFrom(this.store.pipe(select(MessagesSelectors.selectChatThreadAttendeeNumber))),
      filter(([_, matchAttendeeNumber]) => matchAttendeeNumber !== null),
      concatMap(([{ chatThreadId }, matchAttendeeNumber]) =>
        this.updateChatThreadGQL
          .mutate({
            input:
              matchAttendeeNumber === 'Attendee1'
                ? {
                    id: chatThreadId,
                    attendee1LastReadAt: new Date().toISOString(),
                  }
                : {
                    id: chatThreadId,
                    attendee2LastReadAt: new Date().toISOString(),
                  },
          })
          .pipe(map(() => MessageAPIActions.updateAttendeeLastReadAtSuccess()))
      )
    )
  );

  sendMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.sendMessage),
      withLatestFrom(
        this.store.pipe(select(MessagesSelectors.selectChatThread)),
        this.store.pipe(select(selectAttendeeId))
      ),
      concatMap(([action, thread, attendeeId]) =>
        this.createMessageGQL
          .mutate({
            input: {
              content: action.content,
              chatThreadId: thread.id,
              attendeeId,
            },
          })
          .pipe(
            map((result) => result?.data?.createMessage),
            concatMap((message) => [
              MessageAPIActions.sendMessageSuccess({
                message,
              }),
              MessageAPIActions.updateChatThreadLastMessageAt({
                chatThreadId: thread.id,
                lastCreatedMessageDate: message.createdAt,
              }),
            ])
          )
      )
    )
  );

  messageThreadSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.messageThreadSelected),
      switchMap((action) =>
        action.chatThreadId
          ? this.onCreateMessageGQL
              .subscribe(
                {
                  chatThreadId: action.chatThreadId,
                },
                {
                  fetchPolicy: 'network-only',
                }
              )
              .pipe(
                map((result) => result?.data?.onCreateMessage),
                map((message) =>
                  MessageAPIActions.sendMessageSuccess({
                    message,
                  })
                ),
                takeUntil(this.actions$.pipe(ofType(MessagesActions.messageThreadClosed)))
              )
          : of(null)
      ),
      filter((action) => !!action)
    )
  );

  messageThreadListOpened$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        MessageThreadListActions.messageThreadListOpened,
        ConferenceActions.fetchThreadListAttempted,
        conferencePollingAttempted
      ),
      withLatestFrom(this.store.pipe(select(selectConferenceId))),
      switchMap(([action, eventId]) =>
        this.listChatThreadsGQL.fetch(
          {
            filter: {
              eventId: {
                eq: eventId,
              },
            },
          },
          {
            fetchPolicy: 'network-only',
            context: {
              ignoreSpinner: action.type === conferencePollingAttempted.type,
            },
          }
        )
      ),
      map((result) => result?.data?.listChatThreads.items),
      map((chatThreads: any[]) => {
        return MessageAPIActions.getMessageThreadListSuccess({
          chatThreads,
        });
      })
    )
  );

  startChatConversation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MatchesActions.startChatConversation),
      // If a conversation was requested as a User I do want to create the thread and I want to open the threads in order.
      concatMap(({ matchId }) =>
        this.store.select(MessagesSelectors.selectChatThreadByMatch(matchId)).pipe(
          take(1),
          map(({ chatThread }) =>
            chatThread
              ? MessageAPIActions.startChatConversationVerified({ chatThreadId: chatThread.id })
              : MessageAPIActions.ensureMessageThread({ matchId })
          )
        )
      )
    )
  );

  startChatConversationVerified$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MessageAPIActions.startChatConversationVerified),
        withLatestFrom(this.store.select(selectConferenceId)),
        tap(([{ chatThreadId }, conferenceId]) =>
          this.router.navigate(['conferences', conferenceId, 'messages', chatThreadId])
        )
      ),
    { dispatch: false }
  );

  ensureMessageThread$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessageAPIActions.ensureMessageThread),
      withLatestFrom(this.store.select(selectConferenceId)),
      mergeMap(([{ matchId }, conferenceId]) =>
        this.listChatThreadsGQL
          .fetch(
            {
              filter: {
                eventId: {
                  eq: conferenceId,
                },
              },
            },
            {
              fetchPolicy: 'network-only',
              context: {
                ignoreSpinner: true,
              },
            }
          )
          .pipe(map((result) => ({ chatThreads: result?.data?.listChatThreads.items, matchId })))
      ),
      map(({ chatThreads, matchId }) => {
        const chatThread = chatThreads.find((ct) => ct.matchId === matchId);
        return chatThread
          ? MessageAPIActions.ensureMessageThreadSuccess({ chatThread })
          : MessageAPIActions.ensureMessageThreadFailed();
      }),
      catchError(() => of(MessageAPIActions.ensureMessageThreadFailed()))
    )
  );

  ensureMessageThreadSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MessageAPIActions.ensureMessageThreadSuccess),
        withLatestFrom(this.store.select(selectConferenceId)),
        tap(
          ([{ chatThread }, conferenceId]) =>
            void this.router.navigate(['conferences', conferenceId, 'messages', chatThread.id])
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private getChatThreadGQL: GetChatThreadGQL,
    private createMessageGQL: CreateMessageGQL,
    private onCreateMessageGQL: OnCreateMessageGQL,
    private listChatThreadsGQL: ListChatThreadsGQL,
    private updateChatThreadGQL: UpdateChatThreadGQL,
    private router: Router,
    private store: Store<any>
  ) {}
}
