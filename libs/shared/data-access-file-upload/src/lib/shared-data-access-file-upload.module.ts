import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UploadFileEffects } from './store/effects';
import { fileUploadReducer } from './store/reducers';
import { fileUploadFeatureKey } from './store/selectors/file-upload.selectors';

@NgModule({
  imports: [
    StoreModule.forFeature(fileUploadFeatureKey, fileUploadReducer),
    EffectsModule.forFeature([UploadFileEffects]),
  ],
})
export class SharedDataAccessFileUploadModule {}
