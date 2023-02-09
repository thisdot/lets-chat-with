import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Conference } from '@conf-match/core';

@Component({
  selector: 'cm-conference-switcher-item',
  templateUrl: 'conference-switcher-item.component.html',
  styleUrls: ['conference-switcher-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConferenceSwitcherItemComponent {
  @Input() conference: Conference;
}
