import { createAction, props } from '@ngrx/store';

export const messageThreadListOpened = createAction(
  '[Message Thread List] Message Thread List Opened'
);

export const messageThreadListSearched = createAction(
  '[Message Thread List] Message Thread List Searched',
  props<{ term: string }>()
);
