import { ChatThread, Message } from '@conf-match/api';
import { userLogoutSuccess } from '@conf-match/core';
import { MessageAPIActions, MessagesActions, MessageThreadListActions } from '../actions';
import { initialState, messagesReducer, MessagesState } from './messages.reducer';

const messages: Message[] = [
  { attendeeId: '1', content: 'hello', createdAt: '2020-08-03', id: '1' },
];

const messages2: Message[] = [
  { attendeeId: '1', content: 'world', createdAt: '2020-08-04', id: '2' },
];

const chatThread: ChatThread = {
  id: '1',
  messages: { items: messages, nextToken: '2' },
  lastMessageAt: null,
  attendee1LastReadAt: null,
  attendee2LastReadAt: null,
  match: null,
};

const chatThread2: ChatThread = {
  id: '1',
  messages: { items: messages2, nextToken: '3' },
  lastMessageAt: null,
  attendee1LastReadAt: null,
  attendee2LastReadAt: null,
  match: null,
};

describe('Messages Reducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = { type: 'unknown' };
      const state = messagesReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('MessagesActions.messageThreadSelected', () => {
    it('should store the selected chatThreadId', () => {
      const action = MessagesActions.messageThreadSelected({ chatThreadId: '1' });

      const state = messagesReducer(initialState, action);
      const expectedState = { ...initialState, chatThreadId: '1' };

      expect(state).toEqual(expectedState);
    });
  });

  describe('MessageAPIActions.getMessageThreadSuccess', () => {
    it('should store the fetched chat thread', () => {
      const action = MessageAPIActions.getMessageThreadSuccess({ chatThread });

      const state = messagesReducer(initialState, action);
      const expectedState = { ...initialState, chatThread };

      expect(state).toEqual(expectedState);
    });
  });

  describe('MessagesActions.messageThreadClosed', () => {
    it('should clear the chat thread', () => {
      const action = MessagesActions.messageThreadClosed();

      const initialStateModified = { ...initialState, chatThread };

      const state = messagesReducer(initialStateModified, action);

      expect(state).toEqual(initialState);
    });
  });

  describe('MessageAPIActions.getNextMessagesStarted', () => {
    it('should set the loading indicator on', () => {
      const action = MessageAPIActions.getNextMessagesStarted({
        chatThreadId: '1',
        nextToken: '2',
      });

      const state = messagesReducer(initialState, action);
      const expectedState = { ...initialState, isLoadingMessages: true };

      expect(state).toEqual(expectedState);
    });
  });

  describe('MessageAPIActions.getNextMessagesSuccess', () => {
    it('should set the loading indicator off and add the new fetched messages', () => {
      const initialStateModified = { ...initialState, isLoadingMessages: true, chatThread };
      const action = MessageAPIActions.getNextMessagesSuccess({ chatThread: chatThread2 });

      const state = messagesReducer(initialStateModified, action);
      const expectedState: MessagesState = {
        ...initialStateModified,
        isLoadingMessages: false,
        chatThread: {
          ...chatThread,
          messages: { items: [...messages, ...messages2], nextToken: '3' },
        },
      };

      expect(state).toEqual(expectedState);
    });
  });

  describe('MessageAPIActions.getMessageThreadListSuccess', () => {
    it('should set the thread list', () => {
      const action = MessageAPIActions.getMessageThreadListSuccess({
        chatThreads: [chatThread, chatThread2],
      });

      const state = messagesReducer(initialState, action);
      const expectedState: MessagesState = {
        ...initialState,
        chatThreadList: [chatThread, chatThread2],
      };

      expect(state).toEqual(expectedState);
    });
  });

  describe('MessageThreadListActions.messageThreadListSearched', () => {
    const term = 'My best friend';
    it('should set the search term', () => {
      const action = MessageThreadListActions.messageThreadListSearched({
        term,
      });

      const state = messagesReducer(initialState, action);
      const expectedState: MessagesState = {
        ...initialState,
        chatThreadListTerm: term,
      };

      expect(state).toEqual(expectedState);
    });
  });

  describe('userLogoutSuccess', () => {
    const term = 'My best friend';
    it('should reset the state', () => {
      const action = userLogoutSuccess({ route: [] });
      const initialStateModified = { ...initialState, isLoadingMessages: true, chatThread };

      const state = messagesReducer(initialStateModified, action);

      expect(state).toEqual(initialState);
    });
  });
});
