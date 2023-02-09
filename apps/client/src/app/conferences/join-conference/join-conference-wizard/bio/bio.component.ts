import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutActionsService } from '../../../../layout/layout-actions.service';
import { WizardComponent } from '../../../../shared/wizard';
import { JoinConferenceBaseComponent } from '../join-conference-base.component/join-conference-base.component';

export interface BioFormInput {
  bio: string;
}

@Component({
  selector: 'cm-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss'],
})
export class BioComponent extends JoinConferenceBaseComponent<BioFormInput> {
  constructor(
    private _router: Router,
    private formBuilder: UntypedFormBuilder,
    wizard: WizardComponent<BioFormInput>,
    layoutActionsService: LayoutActionsService
  ) {
    super(wizard, layoutActionsService);
    const { bio } = this.wizard.getData();
    this.form = this.formBuilder.group({ bio });

    this.wizard.markVisited();
  }
}
