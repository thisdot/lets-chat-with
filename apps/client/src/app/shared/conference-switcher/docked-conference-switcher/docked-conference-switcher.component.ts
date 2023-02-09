import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Conference } from '@conf-match/core';
import { CM_MODAL_DATA } from '@conf-match/shared';
import { Observable } from 'rxjs';

@Component({
  selector: 'cm-docked-conference-switcher',
  templateUrl: 'docked-conference-switcher.component.html',
  styleUrls: ['docked-conference-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockerConferenceSwitcherComponent {
  constructor(
    @Inject(CM_MODAL_DATA)
    public data: { conferences$: Observable<Conference[]> }
  ) {}

  trackById(index: number, conference: Conference): string {
    return conference?.id;
  }
}
