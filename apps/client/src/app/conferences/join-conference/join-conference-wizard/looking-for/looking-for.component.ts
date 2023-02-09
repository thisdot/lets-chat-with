import { Component } from '@angular/core';
import { LayoutActionsService } from '../../../../layout/layout-actions.service';
import { WizardComponent } from '../../../../shared/wizard';
import { JoinConferenceBaseComponent } from '../join-conference-base.component/join-conference-base.component';
import { IdentifierModel } from '@conf-match/api';
import { filter, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { getMaximumIdentifiers } from '@conf-match/core';

export interface LookingForFormInput {
  connections: IdentifierModel[];
}

@Component({
  selector: 'cm-looking-for',
  templateUrl: './looking-for.component.html',
  styleUrls: ['./looking-for.component.scss'],
})
export class LookingForComponent extends JoinConferenceBaseComponent<LookingForFormInput> {
  selectedConnections = [];

  conference$ = this.activatedRoute.data.pipe(map((data) => data.conference));

  identifiers$ = this.conference$.pipe(map((conference) => conference.identifiers));

  identifiersCount$ = this.conference$.pipe(map(getMaximumIdentifiers), filter(Boolean));

  constructor(
    wizard: WizardComponent<LookingForFormInput>,
    layoutActionsService: LayoutActionsService,
    private activatedRoute: ActivatedRoute
  ) {
    super(wizard, layoutActionsService);
    this.selectedConnections = this.wizard.getData().connections || [];
    this.wizard.markVisited();
  }

  onConnectionsSelected(connections) {
    this.selectedConnections = connections;
    this.wizard.saveData({
      connections: this.selectedConnections,
    });
  }
}
