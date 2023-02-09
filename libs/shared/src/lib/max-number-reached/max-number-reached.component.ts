import { Component, Inject } from '@angular/core';
import { CM_MODAL_DATA } from '../modal.service';
import { ModalController } from '../modal.controller';

export interface MaxNumberReachedData {
  entityName: string;
  maxNumber: number;
}

@Component({
  selector: 'cm-max-number-reached',
  templateUrl: './max-number-reached.component.html',
  styleUrls: ['./max-number-reached.component.scss'],
})
export class MaxNumberReachedComponent {
  constructor(
    @Inject(CM_MODAL_DATA) public data: MaxNumberReachedData,
    private _ctrl: ModalController<void>
  ) {}

  close() {
    this._ctrl.close();
  }
}
