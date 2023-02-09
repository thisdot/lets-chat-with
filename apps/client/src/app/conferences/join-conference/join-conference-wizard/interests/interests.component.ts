import { Component, HostBinding } from '@angular/core';
import { LayoutActionsService } from '../../../../layout/layout-actions.service';
import { JoinConferenceBaseComponent } from '../join-conference-base.component/join-conference-base.component';

import { WizardComponent } from '../../../../shared/wizard';
import { InterestModel } from '@conf-match/api';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { getMaximumInterests } from '@conf-match/core';

export interface InterestsFormInput {
  interests: InterestModel[];
}

@Component({
  selector: 'cm-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.scss'],
})
export class InterestsComponent extends JoinConferenceBaseComponent<InterestsFormInput> {
  conference$ = this.activatedRoute.data.pipe(map((data) => data.conference));

  interests$ = this.conference$.pipe(map((conference) => conference.interests));

  interestsCount$ = this.conference$.pipe(map(getMaximumInterests), filter(Boolean));

  selectedInterests = [];

  constructor(
    wizard: WizardComponent<InterestsFormInput>,
    layoutActionsService: LayoutActionsService,
    private activatedRoute: ActivatedRoute
  ) {
    super(wizard, layoutActionsService);
    this.selectedInterests = this.wizard.getData().interests || [];
    this.wizard.markVisited();
  }

  @HostBinding('class.cm-interests')
  get defaultClass() {
    return true;
  }

  onInterestsSelected(interests) {
    this.selectedInterests = interests;

    this.wizard.saveData({
      interests: this.selectedInterests,
    });
  }
}
