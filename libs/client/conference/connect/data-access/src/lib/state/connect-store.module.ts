import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { connectFeatureKey, connectReducer } from './reducers';

import { ConnectEffects } from './effects';

@NgModule({
  imports: [
    StoreModule.forFeature(connectFeatureKey, connectReducer),
    EffectsModule.forFeature([ConnectEffects]),
  ],
})
export class ConnectStoreModule {}
