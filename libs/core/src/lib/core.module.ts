import { NgModule } from '@angular/core';

import { AmplifyEffects } from './state/amplify.effects';
import { AppStateEffects } from './state/app-state.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ApiModule } from '@conf-match/api';

import { coreFeatureKey, reducer as coreReducer } from './state/core.reducer';
import { CoreEffects } from './state/core.effects';
import { SettingsEffects } from './state/settings.effects';
import { ConferencesStoreModule } from './state/conferences';
import { ConferenceEffects } from './state/conference.effects';
import { ResetPasswordStoreModule } from './state/reset-password';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [],
  imports: [
    TranslocoModule,
    StoreModule.forFeature(coreFeatureKey, coreReducer),
    EffectsModule.forFeature([
      CoreEffects,
      AmplifyEffects,
      AppStateEffects,
      CoreEffects,
      SettingsEffects,
      ConferenceEffects,
    ]),
    ResetPasswordStoreModule,
    ConferencesStoreModule,
  ],
  providers: [ApiModule],
  bootstrap: [],
})
export class CoreModule {}
