import { Component, OnInit, Inject } from '@angular/core';
import { Portal, ComponentPortal } from '@angular/cdk/portal';
import { CM_MODAL_COMPONENT } from '../docked-modal/docked-modal-component.token';

@Component({
  selector: 'cm-blank-modal',
  templateUrl: './blank-modal.component.html',
})
export class BlankModalComponent implements OnInit {
  portal?: Portal<unknown>;

  constructor(@Inject(CM_MODAL_COMPONENT) private _component: any) {}

  ngOnInit(): void {
    this.portal = new ComponentPortal(this._component);
  }
}
