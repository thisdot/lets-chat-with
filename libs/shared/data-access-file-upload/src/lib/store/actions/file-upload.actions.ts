import { createAction, props } from '@ngrx/store';

export const uploadFileFromPhotoPickerAttempted = createAction(`[PhotoPicker] Upload file`);

export const clearFileUploadStateFromPhotoPicker = createAction(
  `[PhotoPicker] Clear file upload state`
);

export const uploadFileSuccess = createAction(
  `[Upload File/API] Upload file success`,
  props<{ url: string }>()
);

export const uploadFileFailed = createAction(
  `[Upload File/API] Upload file failed`,
  props<{ errors: string[] }>()
);
