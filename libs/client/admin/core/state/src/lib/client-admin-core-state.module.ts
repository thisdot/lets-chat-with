import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ConferencesEffects } from './store/effects/conference.effects';
import { CONF_FEATURE_KEY, conferencesReducer } from './store/reducers/conference.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(CONF_FEATURE_KEY, conferencesReducer),
    EffectsModule.forFeature([ConferencesEffects]),
  ],
})
export class ClientAdminCoreStateModule {}
