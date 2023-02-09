import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CM_MODAL_DATA } from '@conf-match/shared';
import { Observable } from 'rxjs';
import { Event } from '@conf-match/api';

@Component({
  selector: 'cm-docked-conference-switcher',
  templateUrl: 'docked-conference-switcher.component.html',
  styleUrls: ['docked-conference-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockerConferenceSwitcherComponent {
  constructor(
    @Inject(CM_MODAL_DATA)
    public data: { conferences$: Observable<Event[]> }
  ) {}

  trackById(index: number, conference: Event): string {
    return conference?.id;
  }
}
