import { Component } from '@angular/core';
import { LayoutActionsService } from '../../../../layout/layout-actions.service';
import { WizardComponent } from '../../../../shared/wizard';
import { JoinConferenceBaseComponent } from '../join-conference-base.component/join-conference-base.component';

export interface UploadPhotoFormInput {
  avatarUrl: string;
}

@Component({
  selector: 'cm-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.scss'],
})
export class UploadPhotoComponent extends JoinConferenceBaseComponent<UploadPhotoFormInput> {
  avatarUrl: string | undefined;

  constructor(
    wizard: WizardComponent<UploadPhotoFormInput>,
    layoutActionsService: LayoutActionsService
  ) {
    super(wizard, layoutActionsService);
    this.avatarUrl = this.wizard.getData().avatarUrl;
    this.wizard.markVisited();
  }

  onPhotoSelect(avatarUrl: string) {
    this.avatarUrl = avatarUrl;
    this.wizard.saveData({ avatarUrl: avatarUrl });
  }
}
