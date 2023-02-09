import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Match, Attendee } from '@conf-match/api';

@Component({
  selector: 'cm-match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchCardComponent {
  @Input()
  match?: Match;

  @Output()
  chat = new EventEmitter();
  @Output()
  info = new EventEmitter();
  @Output()
  menu = new EventEmitter();
}
