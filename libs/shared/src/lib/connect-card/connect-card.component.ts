import { Component, HostBinding, Input, ChangeDetectionStrategy } from '@angular/core';
import { Attendee } from '@conf-match/api';

@Component({
  selector: 'cm-connect-card',
  templateUrl: './connect-card.component.html',
  styleUrls: ['./connect-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectCardComponent {
  @Input()
  attendee?: Attendee;

  @HostBinding('class.cm-connect-card')
  get defaultClass() {
    return true;
  }
}
