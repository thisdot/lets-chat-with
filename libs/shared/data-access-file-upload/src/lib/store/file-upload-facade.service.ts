import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FileUploadService } from '../services/file-upload.service';
import { FileUploadActions } from './actions';
import { FileUploadSelectors } from './selectors';

@Injectable({ providedIn: 'root' })
export class FileUploadFacade {
  readonly isUploadInProgress$ = this.store.select(FileUploadSelectors.selectIsUploading);
  readonly lastFileUploadedUrl$ = this.store.select(FileUploadSelectors.selectLastFileUploadedUrl);

  constructor(private store: Store, private fileUploadService: FileUploadService) {}

  uploadFileFromPhotoPicker(file: File): void {
    this.fileUploadService.setCurrentFileBeingUploaded(file);
    this.store.dispatch(FileUploadActions.uploadFileFromPhotoPickerAttempted());
  }

  clearFileUploadStateFromPhotoPicker(): void {
    this.store.dispatch(FileUploadActions.clearFileUploadStateFromPhotoPicker());
  }
}
