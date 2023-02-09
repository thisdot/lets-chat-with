import { Component, EventEmitter, HostBinding, Input, OnDestroy, Output } from '@angular/core';
import { FileUploadFacade } from '@conf-match/shared/data-access-file-upload';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { filterNotNullOrUndefined } from '@conf-match/utilities';

@Component({
  selector: 'cm-photo-picker',
  templateUrl: './photo-picker.component.html',
  styleUrls: ['./photo-picker.component.scss'],
})
export class PhotoPickerComponent implements OnDestroy {
  @Input() photo?: string;
  @Output() selectPhoto = new EventEmitter<string>();

  readonly isUploadInProgress$ = this.fileUploadFacade.isUploadInProgress$;
  destroy$ = new Subject<void>();

  constructor(private fileUploadFacade: FileUploadFacade) {
    this.fileUploadFacade.lastFileUploadedUrl$
      .pipe(filterNotNullOrUndefined(), takeUntil(this.destroy$))
      .subscribe((avatarUrl: string) => {
        this.photo = avatarUrl;
        this.selectPhoto.next(avatarUrl);
      });
  }

  @HostBinding('class.cm-photo-picker')
  get defaultClass() {
    return true;
  }

  onSelectedPhoto(files: FileList) {
    const file = files && files[0];
    if (file) {
      this.fileUploadFacade.uploadFileFromPhotoPicker(file);
    }
  }

  ngOnDestroy(): void {
    this.fileUploadFacade.clearFileUploadStateFromPhotoPicker();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
