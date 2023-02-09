import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ConferencesEffects } from './effects';
import { conferencesReducer } from './reducers';
import { conferencesFeatureKey } from './selectors/conferences.selectors';

@NgModule({
  imports: [
    StoreModule.forFeature(conferencesFeatureKey, conferencesReducer),
    EffectsModule.forFeature([ConferencesEffects]),
  ],
})
export class ConferencesStoreModule {}
