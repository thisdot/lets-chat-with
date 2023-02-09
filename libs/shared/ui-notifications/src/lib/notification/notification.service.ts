import { Injectable, Injector } from '@angular/core';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { NotificationComponent } from './notification.component';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { NotificationConfig, NotificationController, CM_NOTIFICATION_CONFIG } from './utils';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private _overlay: Overlay, private _injector: Injector) {}

  createNotification$(config: NotificationConfig, backdrop?: boolean) {
    return new Observable((observer) => {
      const ctrl = this.createNotification(config, backdrop);
      const subscription = ctrl.closed.subscribe(observer);

      return () => {
        subscription.unsubscribe();
        ctrl.close();
      };
    });
  }

  createNotification(config: NotificationConfig, backdrop?: boolean): NotificationController {
    const overlayRef = this._createOverlayRef(backdrop);
    const notificationCtrl = new NotificationController(overlayRef);
    const injector = this.createInjector(config, notificationCtrl);
    const componentPortal = new ComponentPortal(NotificationComponent, null, injector);

    overlayRef.attach(componentPortal);
    return notificationCtrl;
  }

  private _createOverlayRef(backdrop?: boolean): OverlayRef {
    const o = this._overlay;
    const config = new OverlayConfig({
      positionStrategy: o.position().global().top().centerHorizontally(),
      scrollStrategy: o.scrollStrategies.block(),
      ...(backdrop ? { backdropClass: 'cm-notifications-backdrop', hasBackdrop: true } : {}),
    });

    return o.create(config);
  }

  private createInjector(config: NotificationConfig, ctrl: NotificationController): Injector {
    return Injector.create({
      providers: [
        { provide: NotificationController, useValue: ctrl },
        { provide: CM_NOTIFICATION_CONFIG, useValue: config },
      ],
      parent: this._injector,
    });
  }
}
