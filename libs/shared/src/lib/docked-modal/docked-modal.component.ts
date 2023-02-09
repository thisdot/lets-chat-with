import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Inject,
  NgZone,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ComponentPortal, Portal } from '@angular/cdk/portal';
import { ModalController } from '../modal.controller';
import { WindowRef } from '../window.service';
import { DockedModalConfig } from './docked-modal.config';
import { DragDirection } from './docked-modal-drag-direction';
import {
  TopOffsetY,
  GestureXYRecorderTimeout,
  GestureYDeltaTolerance,
  GestureXDeltaTolerance,
  GestureAnimationDuration,
  TopOffsetX,
} from './gesture-constants';
import { CM_MODAL_COMPONENT } from './docked-modal-component.token';
import { CM_MODAL_CONFIG } from './docked.modal.token';
import { DEFAULT_DOCKED_MODAL_CONFIG } from './docked-modal.default.config';

@Component({
  selector: 'cm-docked-modal',
  templateUrl: './docked-modal.component.html',
  styleUrls: ['./docked-modal.component.scss'],
})
export class DockedModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('modal') modal?: ElementRef;
  @ViewChild('content') content?: ElementRef;
  config?: DockedModalConfig;

  portal?: Portal<any>;

  private _dragged = false;

  private _contentMinHeight = 0;
  private _contentMaxHeight = 0;

  private _contentMinWidth = 0;
  private _contentMaxWidth = 0;
  private _startY = 0;
  private _startX = 0;
  private _lastY = 0;
  private _lastX = 0;
  private _lastHeight = 0;
  private _lastWidth = 0;

  private _xyRecorderTimeout: any;
  private _recordedY = 0;
  private _recordedX = 0;

  private _dragDirection: DragDirection = DragDirection.Left;

  private _listenersCbs: (() => void)[] = [];

  constructor(
    @Inject(CM_MODAL_COMPONENT) private _component: any,
    @Inject(CM_MODAL_CONFIG) config: DockedModalConfig,
    private _modalCtrl: ModalController<unknown>,
    private _renderer: Renderer2,
    private _window: WindowRef,
    private _zone: NgZone
  ) {
    this.config = {
      ...DEFAULT_DOCKED_MODAL_CONFIG,
      ...config,
    };
  }

  @HostBinding('class.cm-docked-modal--without-spacing')
  get shouldRemoveSpacing() {
    return this.config?.removeSpacing;
  }

  @HostBinding('class.cm-docked-modal--rounded')
  get showRoundedCorners() {
    return this.config?.rounded;
  }

  ngOnInit() {
    this.portal = new ComponentPortal(this._component);

    this._zone.runOutsideAngular(() => {
      this._listenersCbs = [
        this._renderer.listen('document', 'touchend', () => this.onDocumentMouseUp()),
        this._renderer.listen('document', 'mouseup', () => this.onDocumentMouseUp()),
        this._renderer.listen('document', 'touchmove', (e) => this.onDocumentMouseMove(e)),
        this._renderer.listen('document', 'mousemove', (e) => this.onDocumentMouseMove(e)),
      ];
    });
  }

  ngAfterViewInit() {
    this._contentMinHeight = this.content?.nativeElement.offsetHeight;
    this._contentMaxHeight = this._window.ref.innerHeight - TopOffsetY;
    this._contentMinWidth = this.content?.nativeElement.offsetWidth;
    this._contentMaxWidth = this._window.ref.innerWidth - TopOffsetX;

    this.modal?.nativeElement.focus();
  }

  ngOnDestroy() {
    this._listenersCbs.forEach((cb) => cb());
  }

  onHandleMouseDown(e: TouchEvent & MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    this._zone.runOutsideAngular(() => {
      this._dragged = true;
      if (this.shouldStartResizingVertically()) {
        this._startY = e.clientY || e.touches?.[0].clientY;
      }
      if (this.shouldStartResizingHorizontally()) {
        this._startX = e.clientX || e.touches?.[0].clientX;
      }
    });
  }

  private shouldStartResizingHorizontally() {
    return !this._startX && this.config?.direction === 'right';
  }

  private shouldStartResizingVertically() {
    return !this._startY && this.config?.direction === 'bottom';
  }

  onDocumentMouseUp() {
    this._dragged = false;
    this._attemptGestureResize();
  }

  onDocumentMouseMove(e: TouchEvent & MouseEvent) {
    if (!this._dragged) {
      return;
    }

    this._periodicXYRecorder(e);

    const currentY = e.clientY || e.touches?.[0]?.clientY;
    const height = this._calculateNewHeight(currentY);
    const currentX = e.clientX || e.touches?.[0]?.clientX;

    const width = this._calculateNewWidth(currentX);

    if (this.config?.direction === 'bottom') {
      if (this._lastHeight !== height) {
        this._setHeight(height);
      }

      if (this._lastY - currentY > 0) {
        this._dragDirection = DragDirection.Up;
      } else {
        this._dragDirection = DragDirection.Down;
      }

      this._lastHeight = height;
      this._lastY = currentY;
    } else {
      if (this._lastWidth !== width) {
        this._setWidth(width);
      }

      if (this._lastX - currentX > 0) {
        this._dragDirection = DragDirection.Left;
      } else {
        this._dragDirection = DragDirection.Right;
      }

      this._lastWidth = width;
      this._lastX = currentX;
    }
  }

  onClickOutside(): void {
    if (this.config?.closeOnClickOutside) {
      this.onClose();
    }
  }

  onClose() {
    this._setHeight(null);
    this._setWidth(null);
    this._modalCtrl.close();
  }

  /**
   * Calculates the height of the content based on the current Y
   */
  private _calculateNewHeight(currentY: number) {
    return Math.min(
      Math.max(this._contentMinHeight, Math.round(this._startY - currentY)),
      this._contentMaxHeight
    );
  }

  /**
   * Calculates the width of the content based on the current X
   */
  private _calculateNewWidth(currentX: number) {
    return Math.min(
      Math.max(this._contentMinWidth, Math.round(this._startX - currentX)),
      this._contentMaxWidth
    );
  }

  /**
   * Records periodically where the Y is located during drag
   * The smaller the diff between recorded Y is, the slower the user is dragging
   * Respectively, bigger diff => faster dragging
   */
  private _periodicXYRecorder(e: TouchEvent & MouseEvent) {
    if (this._xyRecorderTimeout) {
      clearTimeout(this._xyRecorderTimeout);
    }
    this._xyRecorderTimeout = setTimeout(() => {
      if (this.config?.direction === 'bottom') {
        this._recordedY = e.clientY || e.touches?.[0].clientY;
      } else {
        this._recordedX = e.clientX || e.touches?.[0].clientX;
      }
    }, GestureXYRecorderTimeout);
  }

  /**
   * Checks whether the latest user drag is qualified as a gesture resize
   */
  private _attemptGestureResize() {
    const yDelta = Math.abs(this._lastY - this._recordedY);
    const xDelta = Math.abs(this._lastX - this._recordedX);

    if (
      (yDelta > GestureYDeltaTolerance && this.config?.direction === 'bottom') ||
      (xDelta > GestureXDeltaTolerance && this.config?.direction === 'right')
    ) {
      this._gestureResize();
    }
  }

  /**
   * Performs the animation where the container is extended/retracted
   */
  private _gestureResize() {
    const targetHeight =
      this._dragDirection === DragDirection.Down ? this._contentMinHeight : this._contentMaxHeight;

    const targetWidth =
      this._dragDirection === DragDirection.Right ? this._contentMinWidth : this._contentMaxWidth;

    if (this.config?.direction === 'bottom') {
      this._setTransition(`height ${GestureAnimationDuration}ms ease`);
      this._setHeight(targetHeight);
    } else {
      this._setTransition(`width ${GestureAnimationDuration}ms ease`);
      this._setWidth(targetWidth);
    }

    setTimeout(() => this._setTransition(null), GestureAnimationDuration);
  }

  private _setHeight(height: number | null) {
    const e = this.content?.nativeElement;

    if (height !== null) {
      this._renderer.setStyle(e, 'height', `${height}px`);
    } else {
      this._renderer.removeStyle(e, 'height');
    }
  }

  private _setWidth(width: number | null) {
    const e = this.content?.nativeElement;

    if (width !== null) {
      this._renderer.setStyle(e, 'width', `${width}px`);
    } else {
      this._renderer.removeStyle(e, 'width');
    }
  }

  private _setTransition(transition: string | null) {
    const e = this.content?.nativeElement;

    if (transition !== null) {
      this._renderer.setStyle(e, 'transition', transition);
    } else {
      this._renderer.removeStyle(e, 'transition');
    }
  }
}
