import { createAction, props } from '@ngrx/store';
import { Match, MatchDetails } from '@conf-match/api';

export const getMatchesSuccessful = createAction(
  '[Matches API] Matches get successfully',
  props<{ matches: Array<Match> }>()
);

export const getMatchAttempted = createAction(
  '[Matches API] Get match attempted',
  props<{ id: string }>()
);

export const getMatchSuccessful = createAction(
  '[Matches API] Get match successful',
  props<{ match: MatchDetails }>()
);

export const getMatchFailed = createAction(
  '[Matches API] Get match failed',
  props<{ id: string }>()
);
