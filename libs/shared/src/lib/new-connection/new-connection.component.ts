import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatchAttendee } from '@conf-match/api';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cm-new-connection',
  templateUrl: './new-connection.component.html',
  styleUrls: ['./new-connection.component.scss'],
})
export class NewConnectionComponent {
  @Input() matchAttendee?: MatchAttendee;
  @Output() dismiss = new EventEmitter();
  @Output() chat = new EventEmitter();

  onClose() {
    this.dismiss.emit();
  }

  onChat() {
    this.chat.emit();
  }
}
