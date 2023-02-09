import { TestBed } from '@angular/core/testing';
import { NotificationService, NotificationType } from '@conf-match/shared/ui-notifications';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FileUploadService } from '../../services/file-upload.service';
import { UploadFileEffects } from './file-upload.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { FileUploadActions } from '../actions';
import { TestScheduler } from 'rxjs/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';

describe(UploadFileEffects.name, () => {
  let effects: UploadFileEffects;
  let fileUploadService: FileUploadService;
  let notification: NotificationService;

  let actions: Observable<any>;
  let testScheduler: TestScheduler;
  const MOCK_FILE = {
    name: 'testFile',
  };
  const fileBeingUploadSubject$ = new BehaviorSubject<File>(MOCK_FILE as File);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslocoTestingModule],
      providers: [
        UploadFileEffects,
        {
          provide: FileUploadService,
          useValue: {
            uploadToStorage: (...args: any) => {},
            getImageUrl: (...args: any) => {},
            currentFileBeingUploaded$: fileBeingUploadSubject$,
          },
        },
        {
          provide: NotificationService,
          useValue: { createNotification: (...args: any) => {} },
        },
        provideMockActions(() => actions),
      ],
    });

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    effects = TestBed.inject(UploadFileEffects);
    fileUploadService = TestBed.inject(FileUploadService);
    notification = TestBed.inject(NotificationService);
  });

  describe('uploadFileAttempted$', () => {
    it('should return a FileUploadActions.uploadFileFailed when there is problem uploading the file', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
        const error = 'There was an error';
        const action = FileUploadActions.uploadFileFromPhotoPickerAttempted();
        const completion = FileUploadActions.uploadFileFailed({ errors: [error] });
        const response = cold('-#', null, { message: error });
        spyOn(fileUploadService, 'uploadToStorage').and.returnValue(response as any);

        actions = hot('--a', { a: action });

        expectObservable(effects.uploadFileAttempted$).toBe('---c', { c: completion });
      });
    });

    it('should return a FileUploadActions.uploadFileSuccess when uploading the file completes', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
        const url = 'http://file';
        const action = FileUploadActions.uploadFileFromPhotoPickerAttempted();
        const completion = FileUploadActions.uploadFileSuccess({ url });
        const response = cold('-b|', { b: url });
        spyOn(fileUploadService, 'uploadToStorage').and.returnValue(response as any);

        actions = hot('--a', { a: action });

        expectObservable(effects.uploadFileAttempted$).toBe('---c', { c: completion });
      });
    });

    describe('uploadFileSuccess$', () => {
      it('should show a notification', (done) => {
        const url = 'http://file';
        const action = FileUploadActions.uploadFileSuccess({ url });

        const spy = spyOn(notification, 'createNotification').and.callThrough();

        effects.uploadFileAttempted$.subscribe(() => {
          expect(spy).toHaveBeenCalledTimes(1);
          expect(spy).toHaveBeenCalledWith(
            {
              type: NotificationType.Success,
              //@ts-ignore
              title: jasmine.any(String),
              closeable: true,
              //@ts-ignore
              ttl: jasmine.any(Number),
            },
            false
          );
        });

        actions = of(action);

        done();
      });
    });
    describe('uploadFileFailed$', () => {
      it('should show a notification', (done) => {
        const action = FileUploadActions.uploadFileFailed({ errors: ['Some Error'] });

        const spy = spyOn(notification, 'createNotification').and.callThrough();

        effects.uploadFileAttempted$.subscribe((res) => {
          expect(spy).toHaveBeenCalledTimes(1);
          expect(spy).toHaveBeenCalledWith(
            {
              type: NotificationType.Unavailable,
              //@ts-ignore
              title: jasmine.any(String),
              closeable: true,
              //@ts-ignore
              ttl: jasmine.any(Number),
            },
            false
          );
        });

        actions = of(action);

        done();
      });
    });
  });
});
