import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Event } from '@conf-match/api';

@Component({
  selector: 'cm-conference-switcher-selected-element',
  templateUrl: 'conference-switcher-selected-element.component.html',
  styleUrls: ['conference-switcher-selected-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConferenceSwitcherSelectedElementComponent {
  @Input() selectedConference?: Event | null = null;
  @Input() hideChevron = false;
  @Input() disabled = false;
}
