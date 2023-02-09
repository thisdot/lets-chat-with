import { Component, Input } from '@angular/core';
import { storiesOf } from '@storybook/angular';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';

import { ThemeService } from '@conf-match/shared/theme';
import { DockedModalComponent } from './docked-modal.component';
import { WindowRef } from '../window.service';
import { ModalService } from '../modal.service';
import { SharedStorybookHelpersModule } from '@conf-match/shared/storybook-helpers';
import { SharedUiButtonsModule } from '@conf-match/shared/ui-buttons';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { DockedModalConfig } from './docked-modal.config';
import { DEFAULT_DOCKED_MODAL_CONFIG } from './docked-modal.default.config';

@Component({
  selector: 'cm-content',
  template: '<p>Modal Content</p>',
})
class ContentComponent {}

@Component({
  selector: 'cm-host',
  template: '<button (click)="open()">Open</button>',
})
class HostComponent {
  @Input() config: DockedModalConfig = DEFAULT_DOCKED_MODAL_CONFIG;
  constructor(private _modalService: ModalService) {}

  open() {
    this._modalService.openDockedModal(ContentComponent, null, this.config);
  }
}

const moduleMetadata = {
  imports: [
    SharedStorybookHelpersModule,
    SharedUiButtonsModule,
    SharedUiIconsModule,
    PortalModule,
    OverlayModule,
  ],
  declarations: [DockedModalComponent, ContentComponent, HostComponent],
  providers: [ThemeService, WindowRef, ModalService],
  entryComponents: [DockedModalComponent, ContentComponent],
};

storiesOf('Shared/DockedModal', module)
  .add('Default', () => ({
    moduleMetadata,
    template: `
    <cm-theme>
      <cm-host></cm-host>
    </cm-theme>
  `,
  }))
  .add('without close button', () => ({
    moduleMetadata,
    template: `
    <cm-theme>
      <cm-host [config]="{closeButton: false}"></cm-host>
    </cm-theme>
  `,
  }))
  .add('resizeable', () => ({
    moduleMetadata,
    template: `
    <cm-theme>
      <cm-host [config]="{resizeable: true}"></cm-host>
    </cm-theme>
  `,
  }))
  .add('lateral', () => ({
    moduleMetadata,
    template: `
    <cm-theme>
      <cm-host [config]="{direction: 'right'}"></cm-host>
    </cm-theme>
  `,
  }));
