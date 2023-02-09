import { Component, HostBinding } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LayoutActionsService } from '../../../../layout/layout-actions.service';
import { WizardComponent } from '../../../../shared/wizard';
import { JoinConferenceBaseComponent } from '../join-conference-base.component/join-conference-base.component';

export interface BasicInfoFormInput {
  fullName: string;
  title: string;
  company: string;
  pronouns: string;
  newsletterSubscribed: boolean;
}

@Component({
  selector: 'cm-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
})
export class BasicInfoComponent extends JoinConferenceBaseComponent<BasicInfoFormInput> {
  subscribeBox$: Observable<boolean> = this.route.data.pipe(map((d) => d.subscribeBox));

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    wizard: WizardComponent<BasicInfoFormInput>,
    layoutActionsService: LayoutActionsService
  ) {
    super(wizard, layoutActionsService);
    const { fullName, title, company, pronouns, newsletterSubscribed } = this.wizard.getData();

    this.form = this.formBuilder.group({
      fullName: [fullName, Validators.required],
      title,
      company,
      pronouns,
      newsletterSubscribed,
    });

    this.wizard.markVisited();
  }

  @HostBinding('class.cm-basic-info')
  get defaultClass() {
    return true;
  }
}
