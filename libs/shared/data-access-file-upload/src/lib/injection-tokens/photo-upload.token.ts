import { InjectionToken } from '@angular/core';
import Storage, { StorageClass } from '@aws-amplify/storage';

export const AWS_S3_STORAGE: InjectionToken<StorageClass> = new InjectionToken<StorageClass>(
  'AWS_S3_STORAGE',
  {
    providedIn: 'root',
    factory: () => Storage,
  }
);
