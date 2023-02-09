import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Match } from '@conf-match/api';

@Component({
  selector: 'cm-you-are-chatters-card',
  templateUrl: './you-are-chatters-card.component.html',
  styleUrls: ['./you-are-chatters-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YouAreChattersCardComponent {
  @Input()
  match?: Match;

  @Output()
  chat = new EventEmitter<void>();

  get interests(): string[] {
    return (
      this.match?.interests
        ?.filter((i) => i.attendeeId !== this.match?.attendee.id)
        .map((i) => i.interest.name) ?? []
    );
  }

  get identifiers(): string[] {
    return (
      this.match?.desiredIdentifiers
        ?.filter((di) => di.attendeeId !== this.match?.attendee.id)
        .map((di) => di.desiredIdentifier.name) ?? []
    );
  }
}
