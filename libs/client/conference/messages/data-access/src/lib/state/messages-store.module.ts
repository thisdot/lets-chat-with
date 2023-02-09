import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MessagesEffects } from './effects';
import { messageFeatureKey, messagesReducer } from './reducers';

@NgModule({
  imports: [
    StoreModule.forFeature(messageFeatureKey, messagesReducer),
    EffectsModule.forFeature([MessagesEffects]),
  ],
})
export class MessagesStoreModule {}
