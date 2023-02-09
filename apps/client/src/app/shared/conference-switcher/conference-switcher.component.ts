import { Component } from '@angular/core';
import {
  Conference,
  ConferencesActions,
  ConferencesSelectors,
  selectConference,
} from '@conf-match/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiEvent } from '@conf-match/api';
import { ModalService } from '@conf-match/shared';
import { DockerConferenceSwitcherComponent } from './docked-conference-switcher/docked-conference-switcher.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'cm-conference-switcher',
  templateUrl: './conference-switcher.component.html',
  styleUrls: ['./conference-switcher.component.scss'],
})
export class ConferenceSwitcherComponent {
  conferences$: Observable<Conference[]> = this.store.select(
    ConferencesSelectors.selectAttendeeConferences
  );
  conferencesToSelect$: Observable<Conference[]> = this.store.select(
    ConferencesSelectors.selectAttendeeConferencesToSelect
  );
  selectedConference$: Observable<ApiEvent> = this.store
    .select(selectConference)
    .pipe(filter<ApiEvent>(Boolean));

  constructor(private store: Store, private modalService: ModalService) {
    this.store.dispatch(ConferencesActions.conferencesLoadAttempted());
  }

  openDockedModal(): void {
    this.modalService.openDockedModal(
      DockerConferenceSwitcherComponent,
      { conferences$: this.conferencesToSelect$ },
      {
        closeButton: false,
      }
    );
  }

  trackById(index: number, conference: Conference): string {
    return conference?.id;
  }
}
