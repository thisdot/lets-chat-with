import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Attendee } from '@conf-match/api';

@Component({
  selector: 'cm-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent {
  @Input()
  attendee?: Attendee;

  @Input()
  canEdit = false;

  @Input()
  showOwnIdentifiers = true;

  @Input()
  showSocials = true;

  @Output()
  readonly edit = new EventEmitter<void>();
}
