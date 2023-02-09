import { Message, ChatThread } from '@conf-match/api';
import { createAction, props } from '@ngrx/store';

export const getMessageThreadListSuccess = createAction(
  '[Message API] Get Chat Thread List Success',
  props<{ chatThreads: Array<ChatThread> }>()
);

export const getMessageThreadSuccess = createAction(
  '[Message API] Get Message Chat Thread Success',
  props<{ chatThread: ChatThread }>()
);

export const getNextMessagesStarted = createAction(
  '[Message API] Get next messages Started',
  props<{ chatThreadId: string; nextToken: string }>()
);

export const getNextMessagesSuccess = createAction(
  '[Message API] Get next messages Success',
  props<{ chatThread: ChatThread }>()
);

export const sendMessageSuccess = createAction(
  '[Message API] Send messages success',
  props<{ message: Message }>()
);

export const ensureMessageThread = createAction(
  '[Message API] Ensure chat thread',
  props<{ matchId: string }>()
);

export const ensureMessageThreadSuccess = createAction(
  '[Message API] Ensure chat thread success',
  props<{ chatThread: ChatThread }>()
);
export const ensureMessageThreadFailed = createAction('[Message API] Ensure chat thread failed');

export const startChatConversationVerified = createAction(
  '[Message API] Start chat conversation verified',
  props<{ chatThreadId: string }>()
);

export const updateChatThreadLastMessageAt = createAction(
  '[Message API] Update Chat Thread Last Message At',
  props<{ chatThreadId: string; lastCreatedMessageDate: string }>()
);

export const updateChatThreadLastMessageAtSuccess = createAction(
  '[Message API] Update Chat Thread Last Message At, Success'
);

export const updateAttendeeLastReadAtSuccess = createAction(
  '[Messages] Update Attendee Last Read At Success'
);
