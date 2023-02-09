import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { LayoutActionsService } from '../../../../layout/layout-actions.service';
import { WizardComponent } from '../../../../shared/wizard';
import { JoinConferenceBaseComponent } from '../join-conference-base.component/join-conference-base.component';
import { IdentifierModel } from '@conf-match/api';
import { ActivatedRoute } from '@angular/router';
import { getMaximumIdentifiers } from '@conf-match/core';

export interface WhoIAmFormInput {
  identifiers: IdentifierModel[];
}

@Component({
  selector: 'cm-who-i-am',
  templateUrl: './who-i-am.component.html',
  styleUrls: ['./who-i-am.component.scss'],
})
export class WhoIAmComponent
  extends JoinConferenceBaseComponent<WhoIAmFormInput>
  implements OnInit, OnDestroy
{
  readonly selectedIdentifiers = new BehaviorSubject(this.wizard.getData().identifiers || []);
  readonly selectedIdentifiers$ = this.selectedIdentifiers.asObservable();

  conference$ = this.activatedRoute.data.pipe(map((data) => data.conference));

  identifiers$ = this.conference$.pipe(map((conference) => conference.identifiers));

  identifiersCount$ = this.conference$.pipe(map(getMaximumIdentifiers), filter(Boolean));

  constructor(
    wizard: WizardComponent<WhoIAmFormInput>,
    layoutActionsService: LayoutActionsService,
    private activatedRoute: ActivatedRoute
  ) {
    super(wizard, layoutActionsService);
    this.wizard.markVisited();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.selectedIdentifiers$
      .pipe(
        takeUntil(this.destroy$),
        tap((identifiers) => this.wizard.saveData({ identifiers }))
      )
      .subscribe();
  }
}
