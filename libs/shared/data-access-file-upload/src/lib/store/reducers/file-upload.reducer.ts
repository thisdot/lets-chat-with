import { Action, createReducer, on } from '@ngrx/store';
import { FileUploadActions } from '../actions';

export type FileStatus = 'uploaded' | 'uploading' | 'failure' | 'idle';

export interface FileUploadState {
  lastFileUploadedUrl: string | null;
  status: FileStatus;
  errors: string[];
}

export const initialState: FileUploadState = {
  lastFileUploadedUrl: null,
  status: 'idle',
  errors: [],
};

const reducer = createReducer(
  initialState,

  on(FileUploadActions.uploadFileFromPhotoPickerAttempted, (state) => ({
    ...state,
    status: 'uploading',
  })),

  on(FileUploadActions.uploadFileSuccess, (state, { url }) => ({
    ...state,
    status: 'uploaded',
    lastFileUploadedUrl: url,
  })),

  on(FileUploadActions.uploadFileFailed, (state, { errors }) => ({
    ...state,
    status: 'failure',
    errors: errors,
    lastFileUploadedUrl: null,
  })),

  on(FileUploadActions.clearFileUploadStateFromPhotoPicker, (state) => ({
    ...state,
    ...initialState,
  }))
);

export function fileUploadReducer(state: FileUploadState, action: Action) {
  return reducer(state, action);
}
