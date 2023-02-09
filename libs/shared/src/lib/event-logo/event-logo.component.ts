import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ApiEvent, CreateEventInput } from '@conf-match/api';

@Component({
  selector: 'cm-event-logo',
  templateUrl: './event-logo.component.html',
  styleUrls: ['./event-logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventLogoComponent {
  @Input() event?: ApiEvent | CreateEventInput;
  logo?: string;
}
