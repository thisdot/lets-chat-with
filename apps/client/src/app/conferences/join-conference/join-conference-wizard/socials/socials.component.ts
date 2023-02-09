import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { LayoutActionsService } from '../../../../layout/layout-actions.service';
import { WizardComponent } from '../../../../shared/wizard';
import { JoinConferenceBaseComponent } from '../join-conference-base.component/join-conference-base.component';

export interface SocialsFormInput {
  linkedin: string;
  twitter: string;
  facebook: string;
}

@Component({
  selector: 'cm-socials',
  templateUrl: './socials.component.html',
  styleUrls: ['./socials.component.scss'],
})
export class SocialsComponent
  extends JoinConferenceBaseComponent<SocialsFormInput>
  implements OnInit
{
  form: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    wizard: WizardComponent<SocialsFormInput>,
    layoutActionsService: LayoutActionsService
  ) {
    super(wizard, layoutActionsService);

    const { linkedin, twitter, facebook } = this.wizard.getData();

    this.form = this.formBuilder.group({
      linkedin,
      twitter,
      facebook,
    });

    this.wizard.markVisited();
  }

  get isButtonNext() {
    const f = this.form;

    return f.get('linkedin').value || f.get('twitter').value || f.get('facebook').value;
  }

  ngOnInit() {
    super.ngOnInit();
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((input: SocialsFormInput) => this.wizard.saveData(input));
  }
}
