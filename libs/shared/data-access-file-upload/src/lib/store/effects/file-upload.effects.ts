import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { NotificationService, NotificationType } from '@conf-match/shared/ui-notifications';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FileUploadActions } from '../actions';
import { map, switchMap, catchError, withLatestFrom, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FileUploadService } from '../../services/file-upload.service';
import { filterNotNullOrUndefined } from '@conf-match/utilities';

@Injectable()
export class UploadFileEffects {
  uploadFileAttempted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FileUploadActions.uploadFileFromPhotoPickerAttempted),
      withLatestFrom(
        this.fileUploadService.currentFileBeingUploaded$.pipe(filterNotNullOrUndefined())
      ),
      switchMap(([, file]) =>
        this.fileUploadService.uploadToStorage(file).pipe(
          map((url) => FileUploadActions.uploadFileSuccess({ url })),
          catchError((e) => of(FileUploadActions.uploadFileFailed({ errors: [e.message] })))
        )
      )
    )
  );

  uploadFileSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FileUploadActions.uploadFileSuccess),
        tap(() =>
          this.notificationService.createNotification(
            {
              type: NotificationType.Success,
              title: this.translate.translate('fileUpload.success'),
              closeable: true,
              ttl: 3000,
            },
            false
          )
        )
      ),
    { dispatch: false }
  );

  uploadFileFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FileUploadActions.uploadFileFailed),
        tap(() =>
          this.notificationService.createNotification(
            {
              type: NotificationType.Unavailable,
              title: this.translate.translate('fileUpload.fail'),
              closeable: true,
              ttl: 3000,
            },
            false
          )
        )
      ),
    { dispatch: false }
  );

  clearUploadFile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FileUploadActions.clearFileUploadStateFromPhotoPicker),
        tap(() => this.fileUploadService.setCurrentFileBeingUploaded(null))
      ),
    { dispatch: false }
  );

  constructor(
    private fileUploadService: FileUploadService,
    private translate: TranslocoService,
    private notificationService: NotificationService,
    private actions$: Actions
  ) {}
}
