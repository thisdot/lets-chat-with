import { Component } from '@angular/core';
import { ModalController } from '@conf-match/shared';

@Component({
  selector: 'cm-join-conference-modal',
  templateUrl: './join-conference-modal.component.html',
  styleUrls: ['./join-conference-modal.component.scss'],
})
export class JoinConferenceModalComponent {
  constructor(private _ctrl: ModalController<any>) {}

  showQR() {
    this._ctrl.close({ type: 'success', page: 'QRScan' });
  }

  showHyperlinkForm() {
    this._ctrl.close({ type: 'success', page: 'URLForm' });
  }
}
