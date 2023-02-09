import { Component, Inject, HostListener, HostBinding } from '@angular/core';
import { merge, Subject, timer } from 'rxjs';
import {
  CM_NOTIFICATION_CONFIG,
  NotificationConfig,
  NotificationController,
  NotificationType,
} from './utils';
import { filter, take, tap } from 'rxjs/operators';

const DefaultNotificationTtl = 10000;

const TypeToIconMap = new Map([
  [NotificationType.Success, 'CheckBadge'],
  [NotificationType.Unavailable, 'Unavailable'],
  [undefined, 'Unavailable'],
]);

@Component({
  selector: 'cm-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  private readonly closeAction = new Subject<void>();

  constructor(
    @Inject(CM_NOTIFICATION_CONFIG) public config: NotificationConfig,
    @Inject(NotificationController) private ctrl: NotificationController
  ) {
    this.config.closeable = config.closeable == null || config.closeable;

    merge(
      this.closeAction.asObservable(),
      timer(this.config.ttl || DefaultNotificationTtl).pipe(filter(() => this.config.ttl !== 0))
    )
      .pipe(
        filter(() => !!this.config.closeable),
        take(1),
        tap(() => void this.ctrl.close())
      )
      .subscribe();
  }

  @HostBinding('class.cm-notification--messageless')
  get messageless() {
    return !this.config.message;
  }

  get iconName() {
    return TypeToIconMap.get(this.config.type);
  }

  @HostListener('click')
  onClick() {
    const { clickCb } = this.config;

    if (clickCb) {
      clickCb();
    }

    this.closeAction.next();
  }
}
