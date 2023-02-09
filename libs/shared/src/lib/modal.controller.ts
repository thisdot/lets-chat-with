import { Subject } from 'rxjs';
import { OverlayRef } from '@angular/cdk/overlay';

export class ModalController<TResult> {
  onClose = new Subject<TResult | null>();

  constructor(private _overlayRef: OverlayRef) {}

  close(result: TResult | null = null): void {
    this.onClose.next(result);
    this.onClose.complete();
    this._overlayRef.dispose();
  }
}
