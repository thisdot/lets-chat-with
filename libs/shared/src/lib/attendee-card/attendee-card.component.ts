import { Component, Input } from '@angular/core';
import { Attendee } from '@conf-match/api';

@Component({
  selector: 'cm-attendee-card',
  templateUrl: './attendee-card.component.html',
  styleUrls: ['./attendee-card.component.scss'],
})
export class AttendeeCardComponent {
  @Input() attendee?: Attendee;
}
