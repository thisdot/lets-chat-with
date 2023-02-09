import { createAction, props } from '@ngrx/store';

export const startChatConversation = createAction(
  '[Matches] Start chat conversation',
  props<{ matchId: string }>()
);
