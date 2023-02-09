import { Action, MemoizedSelector } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { MessagesEffects } from './messages.effects';
import { TestScheduler } from 'rxjs/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import {
  ChatThread,
  CreateMessageGQL,
  GetChatThreadGQL,
  ListChatThreadsGQL,
  Message,
  OnCreateMessageGQL,
  UpdateChatThreadGQL,
} from '@conf-match/api';
import { ApolloTestingModule } from 'apollo-angular/testing';
import {
  conferencePollingAttempted,
  MatchAttendeeNumber,
  selectConferenceId,
} from '@conf-match/core';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ConferenceActions,
  MessageAPIActions,
  MessagesActions,
  MessageThreadListActions,
} from '../actions';
import { MessagesSelectors } from '../selectors';
import { Router } from '@angular/router';

const conferenceId = 'xxxx-xxxx-xxxx';
const messageNextToken = 'xxxx-xxxx-xxxx';
const chatThread: ChatThread = {
  id: '1',
  messages: { items: [], nextToken: '' },
  lastMessageAt: null,
  attendee1LastReadAt: null,
  attendee2LastReadAt: null,
  match: null,
};

describe(MessagesEffects.name, () => {
  let testScheduler: TestScheduler;
  // Store
  let effects: MessagesEffects;
  let actions$: Observable<Action>;
  const initialState = {
    messages: {
      chatThreads: [{ id: '1' }],
    },
  };
  let store: MockStore<any>;
  let router: Router;
  // Queries and Mutations
  let getChatThreadGQL: GetChatThreadGQL;
  let createMessageGQL: CreateMessageGQL;
  let onCreateMessageGQL: OnCreateMessageGQL;
  let listChatThreadsGQL: ListChatThreadsGQL;
  let updateChatThreadGQL: UpdateChatThreadGQL;
  // Selectors
  let conferenceIdSelector: MemoizedSelector<any, string>;
  let chatThreadSelector: MemoizedSelector<any, ChatThread>;
  let chatThreadAttendeeNumberSelector: MemoizedSelector<any, MatchAttendeeNumber>;
  let messagesNextToken: MemoizedSelector<any, string>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        MessagesEffects,
        provideMockStore({ initialState }),
        provideMockActions(() => actions$),
      ],
    });

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    router = TestBed.inject(Router);
    // Store
    effects = TestBed.inject(MessagesEffects);
    store = TestBed.inject(MockStore);
    // Queries and Mutations
    getChatThreadGQL = TestBed.inject(GetChatThreadGQL);
    createMessageGQL = TestBed.inject(CreateMessageGQL);
    onCreateMessageGQL = TestBed.inject(OnCreateMessageGQL);
    listChatThreadsGQL = TestBed.inject(ListChatThreadsGQL);
    updateChatThreadGQL = TestBed.inject(UpdateChatThreadGQL);

    // Selectors
    conferenceIdSelector = store.overrideSelector(selectConferenceId, conferenceId);
    messagesNextToken = store.overrideSelector(
      MessagesSelectors.selectMessagesNextToken,
      messageNextToken
    );
    chatThreadAttendeeNumberSelector = store.overrideSelector(
      MessagesSelectors.selectChatThreadAttendeeNumber,
      'Attendee1'
    );
    chatThreadSelector = store.overrideSelector(MessagesSelectors.selectChatThread, chatThread);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('getChatThread$', () => {
    it('should dispatch a getMessageThreadSuccess action with the retrieved message thread on success', () => {
      const action = MessagesActions.messageThreadSelected({ chatThreadId: '1' });

      const outcome = MessageAPIActions.getMessageThreadSuccess({
        chatThread,
      });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });

        const response = cold('-b', { b: { data: { getChatThread: chatThread } } });

        spyOn(getChatThreadGQL, 'fetch').and.returnValue(response as any);

        expectObservable(effects.getChatThread$).toBe('--c', { c: outcome });
      });
    });
  });

  describe('getNextThreadMessages$', () => {
    it('should dispatch a getNextMessagesStarted action with the next token aggregated data', () => {
      const action = MessagesActions.getNextMessages({ chatThreadId: '1' });

      const outcome = MessageAPIActions.getNextMessagesStarted({
        chatThreadId: '1',
        nextToken: messageNextToken,
      });

      testScheduler.run(({ hot, expectObservable }) => {
        actions$ = hot('-a', { a: action });

        expectObservable(effects.getNextThreadMessages$).toBe('-c', { c: outcome });
      });
    });
  });

  describe('getNextMessagesStarted$', () => {
    it('should dispatch a getNextMessagesSuccess action with the retrieved message thread on success', () => {
      const action = MessageAPIActions.getNextMessagesStarted({
        chatThreadId: '1',
        nextToken: messageNextToken,
      });

      const outcome = MessageAPIActions.getNextMessagesSuccess({
        chatThread,
      });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });

        const response = cold('-b', { b: { data: { getChatThread: chatThread } } });

        spyOn(getChatThreadGQL, 'fetch').and.returnValue(response as any);

        expectObservable(effects.getNextMessagesStarted$).toBe('--c', { c: outcome });
      });
    });
  });

  describe('updateChatThreadLastMessage$', () => {
    it('should dispatch a updateChatThreadLastMessageAtSuccess action on success', () => {
      const action = MessageAPIActions.updateChatThreadLastMessageAt({
        chatThreadId: '1',
        lastCreatedMessageDate: '2020-08-03',
      });

      const outcome = MessageAPIActions.updateChatThreadLastMessageAtSuccess();

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });

        const response = cold('-b');

        spyOn(updateChatThreadGQL, 'mutate').and.returnValue(response as any);

        expectObservable(effects.updateChatThreadLastMessage$).toBe('--c', { c: outcome });
      });
    });
  });

  describe('updateAttendeeLastReadAt$', () => {
    it('should dispatch a updateAttendeeLastReadAtSuccess action on success', () => {
      const action = MessagesActions.updateAttendeeLastReadAt({ chatThreadId: '1' });

      const outcome = MessageAPIActions.updateAttendeeLastReadAtSuccess();

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });

        const response = cold('-b');

        spyOn(updateChatThreadGQL, 'mutate').and.returnValue(response as any);

        expectObservable(effects.updateAttendeeLastReadAt$).toBe('--c', { c: outcome });
      });
    });
  });

  describe('sendMessage$', () => {
    it('should dispatch a sendMessageSuccess and updateChatThreadLastMessageAt actions on success', () => {
      const action = MessagesActions.sendMessage({ content: 'hello' });
      const message: Message = {
        content: 'hello',
        attendeeId: '1',
        createdAt: '2020-08-03',
        id: 'xxxx-xxxx',
      };

      const outcome1 = MessageAPIActions.sendMessageSuccess({ message });
      const outcome2 = MessageAPIActions.updateChatThreadLastMessageAt({
        chatThreadId: '1',
        lastCreatedMessageDate: message.createdAt,
      });
      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });

        const response = cold('-b', { b: { data: { createMessage: message } } });

        spyOn(createMessageGQL, 'mutate').and.returnValue(response as any);

        expectObservable(effects.sendMessage$).toBe('--(cd)', { c: outcome1, d: outcome2 });
      });
    });
  });

  describe('messageThreadListOpened$', () => {
    [
      MessageThreadListActions.messageThreadListOpened(),
      ConferenceActions.fetchThreadListAttempted(),
      conferencePollingAttempted({ conferenceId }),
    ].forEach((action) => {
      it('should dispatch a getMessageThreadListSuccess action on success', () => {
        const outcome = MessageAPIActions.getMessageThreadListSuccess({ chatThreads: [] });

        testScheduler.run(({ hot, cold, expectObservable }) => {
          actions$ = hot('-a', { a: action });

          const response = cold('-b', { b: { data: { listChatThreads: { items: [] } } } });

          spyOn(listChatThreadsGQL, 'fetch').and.returnValue(response as any);

          expectObservable(effects.messageThreadListOpened$).toBe('--c', { c: outcome });
        });
      });
    });
  });

  describe('startChatConversationVerified$', () => {
    it('should navigate to the message page', () => {
      const action = MessageAPIActions.startChatConversationVerified({ chatThreadId: '1' });

      const navigate = spyOn(router, 'navigate');

      actions$ = of(action);

      effects.startChatConversationVerified$.subscribe(() => {
        expect(navigate).toHaveBeenCalled();
        expect(navigate).toHaveBeenCalledWith([
          'conferences',
          conferenceId,
          'messages',
          chatThread.id,
        ]);
      });
    });
  });

  describe('createMessageThread$', () => {
    it('should dispatch a createMessageThreadSuccess action on success', () => {
      const action = MessageAPIActions.createMessageThread({ matchId: '1' });

      const outcome = MessageAPIActions.createMessageThreadSuccess({ chatThread });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });

        const response = cold('-b', { b: { data: { createChatThread: chatThread } } });

        spyOn(createChatThreadGQL, 'mutate').and.returnValue(response as any);

        expectObservable(effects.createMessageThread$).toBe('--c', { c: outcome });
      });
    });

    it('should dispatch a createMessageThreadFailed action on failure', () => {
      const action = MessageAPIActions.createMessageThread({ matchId: '1' });

      const outcome = MessageAPIActions.createMessageThreadFailed();

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });

        const response = cold('-#|');

        spyOn(createChatThreadGQL, 'mutate').and.returnValue(response as any);

        expectObservable(effects.createMessageThread$).toBe('--c', { c: outcome });
      });
    });
  });

  describe('createMessageThreadSuccess$', () => {
    it('should navigate to the message page', () => {
      const action = MessageAPIActions.createMessageThreadSuccess({ chatThread });

      const navigate = spyOn(router, 'navigate');

      actions$ = of(action);

      effects.startChatConversationVerified$.subscribe(() => {
        expect(navigate).toHaveBeenCalled();
        expect(navigate).toHaveBeenCalledWith([
          'conferences',
          conferenceId,
          'messages',
          chatThread.id,
        ]);
      });
    });
  });
});
