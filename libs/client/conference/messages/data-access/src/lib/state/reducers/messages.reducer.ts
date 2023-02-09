import { Action, on, createReducer } from '@ngrx/store';
import { ChatThread } from '@conf-match/api';
import { MessageAPIActions, MessagesActions, MessageThreadListActions } from '../actions';
import { userLogoutSuccess } from '@conf-match/core';
import { MatchesActions } from '@conf-match/client/conference/matches/data-access';

export const messageFeatureKey = 'messages';

export interface MessagesState {
  chatThread: ChatThread;
  chatThreadList: Array<ChatThread>;
  chatThreadListTerm: string;
  isLoadingMessages: boolean;
}

export const initialState: MessagesState = {
  chatThread: null,
  chatThreadList: null,
  chatThreadListTerm: '',
  isLoadingMessages: false,
};

const reducer = createReducer(
  initialState,
  on(MessagesActions.messageThreadSelected, (state, action) => ({
    ...state,
    chatThreadId: action.chatThreadId,
  })),

  on(MessageAPIActions.getMessageThreadSuccess, (state, action) => ({
    ...state,
    chatThread: action.chatThread,
  })),

  on(MessagesActions.messageThreadClosed, (state, action) => ({
    ...state,
    chatThread: null,
  })),

  on(MessageAPIActions.getNextMessagesStarted, (state) => ({
    ...state,
    isLoadingMessages: true,
  })),

  on(MessageAPIActions.getNextMessagesSuccess, (state, action) => ({
    ...state,
    isLoadingMessages: false,
    chatThread: {
      ...action.chatThread,
      messages: {
        ...action.chatThread.messages,
        items: [...state.chatThread.messages.items, ...action.chatThread.messages.items],
      },
    },
  })),

  on(MessageAPIActions.sendMessageSuccess, (state, action) => ({
    ...state,
    chatThread: {
      ...state.chatThread,
      messages: {
        ...state.chatThread.messages,
        items: [
          action.message,
          ...state.chatThread.messages.items.filter((item) => item.id !== action.message.id),
        ],
      },
    },
  })),

  on(MessageAPIActions.getMessageThreadListSuccess, (state, action) => ({
    ...state,
    chatThreadList: action.chatThreads,
  })),

  on(MessageThreadListActions.messageThreadListSearched, (state, action) => ({
    ...state,
    chatThreadListTerm: action.term,
  })),

  on(userLogoutSuccess, () => initialState)
);

export function messagesReducer(state: MessagesState, action: Action) {
  return reducer(state, action);
}
