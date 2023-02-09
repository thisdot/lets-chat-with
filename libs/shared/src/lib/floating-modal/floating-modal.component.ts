import { Component, OnInit, Inject, HostBinding } from '@angular/core';

import { Portal, ComponentPortal } from '@angular/cdk/portal';
import { CM_MODAL_COMPONENT } from '../docked-modal/docked-modal-component.token';

@Component({
  selector: 'cm-floating-modal',
  templateUrl: './floating-modal.component.html',
  styleUrls: ['./floating-modal.component.scss'],
})
export class FloatingModalComponent implements OnInit {
  portal?: Portal<unknown>;

  constructor(@Inject(CM_MODAL_COMPONENT) private _component: any) {}

  @HostBinding('class.cm-floating-modal')
  get defaultClass() {
    return true;
  }

  ngOnInit(): void {
    this.portal = new ComponentPortal(this._component);
  }
}
