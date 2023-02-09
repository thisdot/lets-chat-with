import { InjectionToken } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

export enum NotificationType {
  Success = 'Success',
  Unavailable = 'Unavailable',
  ServerError = 'ServerError',
}

export interface NotificationConfig {
  title: string;
  message?: string;
  type?: NotificationType;
  ttl?: number;
  closeable?: boolean;
  clickCb?: () => void;
}

export const CM_NOTIFICATION_CONFIG = new InjectionToken('CM_NOTIFICATION_CONFIG');

export class NotificationController {
  private _closed = new Subject<void>();
  public closed = this._closed.asObservable();

  constructor(private _overlayRef: OverlayRef) {}

  close() {
    this._overlayRef.detach();
    this._closed.next();
    this._closed.complete();
  }

  closeWhenBackdropClick() {
    return this._overlayRef.backdropClick().pipe(
      tap((_) => {
        this.close();
      })
    );
  }
}
