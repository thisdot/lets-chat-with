import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Inject, Injectable, InjectionToken, Injector, Optional } from '@angular/core';
import { BlankModalComponent } from './blank-modal/blank-modal.component';
import { CM_MODAL_COMPONENT } from './docked-modal/docked-modal-component.token';

import { DockedModalComponent } from './docked-modal/docked-modal.component';
import { DockedModalConfig } from './docked-modal/docked-modal.config';
import { CM_MODAL_CONFIG } from './docked-modal/docked.modal.token';
import { FloatingModalComponent } from './floating-modal/floating-modal.component';
import { ModalController } from './modal.controller';
import { combineLatest, defer, merge, NEVER, Observable, Subject, timer } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  finalize,
  mapTo,
  share,
  startWith,
  take,
  takeUntil,
} from 'rxjs/operators';
import { SpinnerComponent } from './spinner/spinner.component';

export const CM_MODAL_DATA = new InjectionToken('CM_MODAL_DATA');
export const CM_SPINNER_MINIMAL_THROTTLE_TIME = new InjectionToken(
  'CM_SPINNER_MINIMAL_THROTTLE_TIME'
);
export const CM_SPINNER_MINIMAL_SHOW_TIME = new InjectionToken('CM_SPINNER_MINIMAL_SHOW_TIME');

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public readonly spinner$ = defer(() => {
    const modalCtrl = this.showSpinner();
    return NEVER.pipe(
      finalize(() => {
        modalCtrl.close();
      })
    );
  }).pipe(share());

  constructor(
    private _overlay: Overlay,
    private _injector: Injector,
    @Optional() @Inject(CM_SPINNER_MINIMAL_SHOW_TIME) private minimalShowTime: number,
    @Optional() @Inject(CM_SPINNER_MINIMAL_THROTTLE_TIME) private minimalThrottleTime: number
  ) {
    this.minimalShowTime = this.minimalShowTime || 500;
    this.minimalThrottleTime = this.minimalThrottleTime || 200;
  }

  initSpinner() {
    const subject = new Subject<{ subPerOperation: Observable<string>; context: any }>();
    subject.subscribe((sub: { subPerOperation: Observable<string>; context: any }) => {
      const request$ = sub.subPerOperation;
      const showSpinner$ = merge(
        timer(this.minimalThrottleTime).pipe(take(1), mapTo(true), takeUntil(request$)),
        combineLatest([
          request$,
          timer(this.minimalShowTime + this.minimalThrottleTime).pipe(take(1)),
        ]).pipe(mapTo(false))
      ).pipe(startWith(false), distinctUntilChanged());

      showSpinner$.subscribe((value) => {
        if (value) {
          sub.context.spinnerSub = this.spinner$.subscribe();
        } else {
          const spinnerSub = sub.context.spinnerSub;
          if (spinnerSub) {
            spinnerSub.unsubscribe();
          }
        }
      });
    });
    return subject;
  }

  openDockedModal<TResult, TData>(component: unknown, data?: TData, config?: DockedModalConfig) {
    return this._open<TResult, TData, DockedModalConfig>(
      (injector) => new ComponentPortal(DockedModalComponent, null, injector),
      component,
      data,
      config
    );
  }

  openFloatingModal<TResult, TData>(component: unknown, data?: TData) {
    return this._open<TResult, TData, void>(
      (injector) => new ComponentPortal(FloatingModalComponent, null, injector),
      component,
      data
    );
  }

  openBlankModal<TResult, TData>(
    component: unknown,
    data?: TData,
    overlayConfig?: Partial<OverlayConfig>,
    closeWhenBackdropClick = true
  ) {
    return this._open<TResult, TData, void>(
      (injector) => new ComponentPortal(BlankModalComponent, null, injector),
      component,
      data,
      undefined,
      overlayConfig,
      closeWhenBackdropClick
    );
  }

  showSpinner<TResult, TData>(
    // tslint:disable-next-line: deprecation
    data?: TData
  ): ModalController<TResult> {
    return this.openBlankModal(SpinnerComponent, data, { hasBackdrop: true }, false);
  }

  private _open<TResult, TData, TConfig>(
    // tslint:disable-next-line: deprecation
    portalStrategy: (injector: Injector) => ComponentPortal<unknown>,
    component: unknown,
    data?: TData,
    config?: TConfig,
    overlayConfig?: Partial<OverlayConfig>,
    closeWhenBackdropClick = true
  ): ModalController<TResult> {
    const overlayRef = this._createOverlay(overlayConfig);
    const modalCtrl = new ModalController<TResult>(overlayRef);

    // Here we prepare the Angular Injector so that the ModalComponent has access to:
    // - The component we want to show as a modal
    // - The modalRef to close the modal

    // The data is only accessed from inside the component we want to show as a modal, not the ModalComponent.
    const injector = this._createInjector(component, data, config, modalCtrl);
    const componentPortal = portalStrategy(injector);

    overlayRef.attach(componentPortal);
    if (closeWhenBackdropClick) {
      overlayRef.backdropClick().subscribe(() => modalCtrl.close());
    }

    return modalCtrl;
  }

  private _createOverlay(config?: Partial<OverlayConfig>) {
    const overlayConfig = this._getOverlayConfig(config);
    return this._overlay.create(overlayConfig);
  }

  private _getOverlayConfig(customConfig?: Partial<OverlayConfig>): OverlayConfig {
    const positionStrategy = this._overlay.position().global();

    const overlayConfig = new OverlayConfig({
      scrollStrategy: this._overlay.scrollStrategies.block(),
      positionStrategy,
      ...customConfig,
    });

    return overlayConfig;
  }

  private _createInjector<TResult, TData, TConfig>(
    component: unknown,
    data: TData,
    config: TConfig,
    modalRef: ModalController<TResult>
  ): Injector {
    const injectionTokens = new WeakMap();

    injectionTokens.set(ModalController, modalRef);
    injectionTokens.set(CM_MODAL_COMPONENT, component);
    injectionTokens.set(CM_MODAL_DATA, data);
    injectionTokens.set(CM_MODAL_CONFIG, config || null);

    return Injector.create({
      providers: [
        { provide: ModalController, useValue: modalRef },
        { provide: CM_MODAL_COMPONENT, useValue: component },
        { provide: CM_MODAL_DATA, useValue: data },
        { provide: CM_MODAL_CONFIG, useValue: config || null },
      ],
      parent: this._injector,
    });
  }
}
