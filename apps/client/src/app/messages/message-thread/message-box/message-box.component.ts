import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cm-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageBoxComponent {
  message: string;

  @Output()
  send = new EventEmitter<string>();

  submit($event) {
    $event.preventDefault();
    this.send.emit(this.message);
    this.message = null;
  }
}
