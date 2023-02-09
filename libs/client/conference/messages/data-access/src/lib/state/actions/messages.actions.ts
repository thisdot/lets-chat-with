import { createAction, props } from '@ngrx/store';

export const messageThreadSelected = createAction(
  '[Messages] Message Thread Selected',
  props<{ chatThreadId: string }>()
);

export const messageThreadClosed = createAction('[Messages] Message Thread Closed');

export const getNextMessages = createAction(
  '[Messages] Get next messages',
  props<{ chatThreadId: string }>()
);

export const sendMessage = createAction('[Messages] Send messages', props<{ content: string }>());

export const updateAttendeeLastReadAt = createAction(
  '[Messages] Update Attendee Last Read At',
  props<{ chatThreadId: string }>()
);
