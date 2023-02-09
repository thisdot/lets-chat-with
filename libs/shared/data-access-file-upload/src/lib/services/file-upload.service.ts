import { Injectable } from '@angular/core';
import { isNotNullOrUndefined } from '@conf-match/utilities';
import { BehaviorSubject, filter, Observable, Subject } from 'rxjs';
import { switchMap, pluck, map } from 'rxjs/operators';
import { FileUploadGQL } from '@conf-match/api';

const USER_IMAGE_FOLDER = 'public/users/profile_images';

@Injectable({ providedIn: 'root' })
export class FileUploadService {
  private readonly currentFileBeingUploadedSubject$ = new BehaviorSubject<File | null>(null);

  public get currentFileBeingUploaded$() {
    return this.currentFileBeingUploadedSubject$.asObservable();
  }

  public setCurrentFileBeingUploaded(file: File | null) {
    this.currentFileBeingUploadedSubject$.next(file);
  }

  constructor(private fileUploadGQL: FileUploadGQL) {}

  /**
   * Uploads the file into the user s3 storage.
   * @param file - The file
   * @private
   */
  uploadToStorage(file: File): Observable<string> {
    return this.toBase64(file).pipe(
      switchMap<string, Observable<string>>((base64) =>
        this.fileUploadGQL
          .mutate({
            bucketFolder: USER_IMAGE_FOLDER,
            fileName: this.generateFileName(file),
            base64,
          })
          .pipe(
            map((result) => result?.data?.fileUpload),
            filter(isNotNullOrUndefined)
          )
      )
    );
  }

  private generateFileName(file: File): string {
    return `${new Date().getTime()}_${file.name}`;
  }

  /**
   * Converts a file to its base64 form
   */
  toBase64(file: File): Observable<string> {
    const sub = new Subject<string>();
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      sub.next(reader.result as string);
      sub.complete();
    };
    reader.onerror = (error) => sub.error(error);
    return sub.asObservable();
  }
}
