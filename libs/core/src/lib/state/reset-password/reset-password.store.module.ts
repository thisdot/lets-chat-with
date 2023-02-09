import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ResetPasswordEffects } from './effects';
import { resetPasswordReducer } from './reducers';
import { resetPasswordFeatureKey } from './selectors/reset-password.selectors';

@NgModule({
  imports: [
    EffectsModule.forFeature([ResetPasswordEffects]),
    StoreModule.forFeature(resetPasswordFeatureKey, resetPasswordReducer),
  ],
})
export class ResetPasswordStoreModule {}
