import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ModalService } from '@conf-match/shared';
import { filter } from 'rxjs/operators';
import { Event } from '@conf-match/api';
import {
  conferencesLoadAttempted,
  selectConference,
  selectConferences,
} from '@conf-match/client/admin/core/state';
import { DockerConferenceSwitcherComponent } from './docked-conference-switcher/docked-conference-switcher.component';

@Component({
  selector: 'cm-conference-switcher',
  templateUrl: './conference-switcher.component.html',
  styleUrls: ['./conference-switcher.component.scss'],
})
export class ConferenceSwitcherComponent {
  conferences$: Observable<Event[]> = this.store.select(selectConferences);

  selectedConference$: Observable<Event | undefined | null> = this.store
    .select(selectConference)
    .pipe(filter<Event | undefined | null>(Boolean));

  constructor(private readonly store: Store, private readonly modalService: ModalService) {
    this.store.dispatch(conferencesLoadAttempted());
  }

  openDockedModal(): void {
    this.modalService.openDockedModal(
      DockerConferenceSwitcherComponent,
      { conferences$: this.conferences$ },
      {
        closeButton: false,
      }
    );
  }

  trackById(index: number, conference: Event): string {
    return conference?.id;
  }
}
