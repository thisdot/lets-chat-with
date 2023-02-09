import { storiesOf } from '@storybook/angular';
import { SharedStorybookHelpersModule } from '@conf-match/shared/storybook-helpers';
import { SpinnerComponent } from './spinner.component';
import { ModalService } from '../modal.service';
import { ModalController } from '../modal.controller';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { BlankModalComponent } from '../blank-modal/blank-modal.component';

@Component({
  selector: 'cm-spinner-container',
  template: `
    <p>Spinner</p>
    <button cm-button (click)="toggleSpinner()">{{ btnText }}</button>
  `,
  styles: [
    `
      :host {
        text-align: center;
        display: flex;
        flex-direction: column;
      }

      button {
        margin-top: 20px;
      }
    `,
  ],
})
class SpinnerContainerComponent {
  isShow = false;
  btnText = 'Show Spinner';
  modalCtl: ModalController<any>;
  constructor(private modalService: ModalService) {}

  toggleSpinner() {
    if (!this.isShow) {
      this.modalCtl = this.modalService.showSpinner();
    } else {
      this.modalCtl.close();
    }
    this.isShow = !this.isShow;
    this.btnText = this.isShow ? 'Close Spinner' : 'Show Spinner';
  }
}

const moduleMetadata = {
  declarations: [SpinnerComponent, SpinnerContainerComponent, BlankModalComponent],
  imports: [SharedStorybookHelpersModule, PortalModule, OverlayModule],
  providers: [ModalService],
  entryComponents: [SpinnerContainerComponent, SpinnerComponent, BlankModalComponent],
};

storiesOf('Shared/Spinner', module).add('Default', () => ({
  moduleMetadata,
  template: `
  <cm-spinner-container></cm-spinner-container>
`,
}));
