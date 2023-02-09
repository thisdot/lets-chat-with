import { createAction } from '@ngrx/store';

export const userOnline = createAction('[Core.AppState] User Online');
export const userOffline = createAction('[Core.AppState] User Offline');

export const appStateEffectsInitialized = createAction('[Core.AppState] AppStateEffects Init');
