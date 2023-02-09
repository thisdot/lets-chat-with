import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MatchesEffects } from './effects';
import { matchesFeatureKey, matchesReducer } from './reducers';

@NgModule({
  imports: [
    StoreModule.forFeature(matchesFeatureKey, matchesReducer),
    EffectsModule.forFeature([MatchesEffects]),
  ],
})
export class MatchesStoreModule {}
