import { FileUploadActions } from '../actions';
import { fileUploadReducer, FileUploadState, initialState } from './file-upload.reducer';
describe('File Upload Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = fileUploadReducer(initialState, {} as any);

      expect(result).toEqual(initialState);
    });
  });

  describe('FileUploadActions', () => {
    it('should set the state to "uploading" on "uploadFileFromPhotoPickerAttempted"', () => {
      const result = fileUploadReducer(
        initialState,
        FileUploadActions.uploadFileFromPhotoPickerAttempted()
      );
      const expected: FileUploadState = {
        lastFileUploadedUrl: null,
        status: 'uploading',
        errors: [],
      };

      expect(result).toEqual(expected);
    });

    it('should set the state to "uploaded" and set the url on "uploadFileSuccess"', () => {
      const url = 'http://example';
      const result = fileUploadReducer(initialState, FileUploadActions.uploadFileSuccess({ url }));
      const expected: FileUploadState = {
        lastFileUploadedUrl: url,
        status: 'uploaded',
        errors: [],
      };

      expect(result).toEqual(expected);
    });

    it('should set the state to "failure" and set the errors on "uploadFileFailed"', () => {
      const errors = ['someError'];
      const result = fileUploadReducer(
        initialState,
        FileUploadActions.uploadFileFailed({ errors })
      );
      const expected: FileUploadState = {
        lastFileUploadedUrl: null,
        status: 'failure',
        errors,
      };

      expect(result).toEqual(expected);
    });

    it('should reset the state on "clearFileUploadStateFromPhotoPicker"', () => {
      const result = fileUploadReducer(
        initialState,
        FileUploadActions.clearFileUploadStateFromPhotoPicker()
      );

      expect(result).toEqual(initialState);
    });
  });
});
