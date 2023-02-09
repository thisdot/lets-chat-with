import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FileUploadFacade } from '@conf-match/shared/data-access-file-upload';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { EMPTY, Subject } from 'rxjs';
import { EllipsisComponent } from '../loading-ellipsis/ellipsis.component';
import { PhotoPickerComponent } from './photo-picker.component';

import Spy = jasmine.Spy;
import { DebugElement } from '@angular/core';
import { TranslocoTestingModule } from '@ngneat/transloco';

const isUploadingSubject = new Subject<boolean>();
const lastFileUploadedUrlSubject = new Subject<string>();

const MOCK_FILE_UPLOAD_FACADE: Partial<FileUploadFacade> = {
  uploadFileFromPhotoPicker: () => EMPTY,
  clearFileUploadStateFromPhotoPicker: () => EMPTY,
  isUploadInProgress$: isUploadingSubject.asObservable(),
  lastFileUploadedUrl$: lastFileUploadedUrlSubject.asObservable(),
};

describe('PhotoPickerComponent', () => {
  let component: PhotoPickerComponent;
  let fixture: ComponentFixture<PhotoPickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoPickerComponent, EllipsisComponent],
      providers: [
        {
          provide: FileUploadFacade,
          useValue: MOCK_FILE_UPLOAD_FACADE,
        },
      ],
      imports: [SharedUiIconsModule, TranslocoTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoPickerComponent);
    component = fixture.componentInstance;
    isUploadingSubject.next(false);
    lastFileUploadedUrlSubject.next(null);
    fixture.detectChanges();
  });

  it('should render appropriate icons, if an image is not available', () => {
    isUploadingSubject.next(false);
    fixture.detectChanges();

    const singleManIcon = fixture.debugElement.query(
      By.css('.cm-photo-picker__container > cm-icon')
    );
    expect(singleManIcon.componentInstance.name).toEqual('SingleMan');

    const plusIcon = fixture.debugElement.query(By.css('.cm-photo-picker__icon > cm-icon'));
    expect(plusIcon.componentInstance.name).toEqual('Plus');
  });

  it('should render the photo and refresh icon, if an image is available', () => {
    component.photo = 'https://example.com/img.jpg';
    isUploadingSubject.next(false);
    lastFileUploadedUrlSubject.next('https://example.com/img.jpg');

    fixture.detectChanges();

    const imgEl = fixture.debugElement.query(By.css('img'));
    expect(imgEl).toBeTruthy();

    const refreshIcon = fixture.debugElement.query(By.css('.cm-photo-picker__icon > cm-icon'));
    expect(refreshIcon.componentInstance.name).toEqual('Refresh');
  });

  it('should have onSelectedPhoto called on input change', () => {
    const onSelectedPhotoSpy = spyOn(component, 'onSelectedPhoto');
    const input = fixture.debugElement.query(By.css('input'));

    input.triggerEventHandler('change', { target: { files: [] } });

    expect(onSelectedPhotoSpy).toHaveBeenCalled();
  });

  describe(`uploading an image`, () => {
    let onSelectedPhotoSpy: Spy;
    let input: DebugElement;

    beforeEach(() => {
      component.photo = 'https://example.com/img.jpg';
      onSelectedPhotoSpy = spyOn(component, 'onSelectedPhoto').and.callThrough();
      input = fixture.debugElement.query(By.css('input'));
      isUploadingSubject.next(false);
      lastFileUploadedUrlSubject.next(null);
      fixture.detectChanges();
    });

    it('should show and hide the loading ellipsis based on the facade status', fakeAsync(() => {
      isUploadingSubject.next(true);
      fixture.detectChanges();

      let ellipsis = fixture.debugElement.query(
        By.css('.cm-photo-picker__container > cm-ellipsis')
      );
      expect(ellipsis.componentInstance.size).toEqual(100);

      isUploadingSubject.next(false);

      fixture.detectChanges();

      ellipsis = fixture.debugElement.query(By.css('.cm-photo-picker__container > cm-ellipsis'));
      expect(ellipsis).toBe(null);
      expect(component.photo).toEqual('https://example.com/img.jpg');
    }));
  });
});
