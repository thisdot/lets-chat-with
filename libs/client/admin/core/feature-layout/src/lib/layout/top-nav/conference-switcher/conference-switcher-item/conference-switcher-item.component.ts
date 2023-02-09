import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Event } from '@conf-match/api';

@Component({
  selector: 'cm-conference-switcher-item',
  templateUrl: 'conference-switcher-item.component.html',
  styleUrls: ['conference-switcher-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConferenceSwitcherItemComponent {
  @Input() conference?: Event;
}
