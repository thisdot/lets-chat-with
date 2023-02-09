import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FileUploadState } from '../reducers';

export const fileUploadFeatureKey = 'fileUpload';

const selectFileUpload = createFeatureSelector<FileUploadState>(fileUploadFeatureKey);

export const selectLastFileUploadedUrl = createSelector(
  selectFileUpload,
  (fileUpload) => fileUpload.lastFileUploadedUrl
);

export const selectErrors = createSelector(selectFileUpload, (fileUpload) => fileUpload.errors);

export const selectStatus = createSelector(selectFileUpload, (fileUpload) => fileUpload.status);

export const selectIsUploading = createSelector(selectStatus, (status) => status === 'uploading');
