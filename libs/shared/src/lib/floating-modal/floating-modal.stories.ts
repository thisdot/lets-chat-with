import { Component } from '@angular/core';
import { storiesOf } from '@storybook/angular';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';

import { ThemeService } from '@conf-match/shared/theme';
import { FloatingModalComponent } from './floating-modal.component';
import { ModalService } from '../modal.service';
import { ModalController } from '../modal.controller';
import { SharedUiButtonsModule } from '@conf-match/shared/ui-buttons';
import { SharedStorybookHelpersModule } from '@conf-match/shared/storybook-helpers';

@Component({
  selector: 'cm-content',
  template: `
    <p>Modal Content</p>
    <button cm-button (click)="close()">Close</button>
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
class ContentComponent {
  constructor(private _ctrl: ModalController<void>) {}

  close() {
    this._ctrl.close();
  }
}

@Component({
  selector: 'cm-host',
  template: '<button (click)="open()">Open</button>',
})
class HostComponent {
  constructor(private _modalService: ModalService) {}

  open() {
    this._modalService.openFloatingModal(ContentComponent);
  }
}

const moduleMetadata = {
  imports: [SharedStorybookHelpersModule, SharedUiButtonsModule, PortalModule, OverlayModule],
  declarations: [FloatingModalComponent, ContentComponent, HostComponent],
  providers: [ThemeService, ModalService],
  entryComponents: [FloatingModalComponent, ContentComponent],
};

storiesOf('Shared/FloatingModal', module).add('Default', () => ({
  moduleMetadata,
  template: `
    <cm-theme>
      <cm-host></cm-host>
    </cm-theme>
  `,
}));
