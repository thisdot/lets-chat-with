import { Component, HostBinding, Input, ChangeDetectionStrategy } from '@angular/core';
import { Message } from '@conf-match/api';

@Component({
  selector: 'cm-message-list-item',
  templateUrl: './message-list-item.component.html',
  styleUrls: ['./message-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageListItemComponent {
  @Input()
  type: 'sent' | 'received' = 'received';

  @Input()
  message: Message;

  @HostBinding('class.cm-message-list-item')
  defaultClass() {
    return true;
  }

  @HostBinding('class.cm-message-list-item--sent')
  get isSent() {
    return this.type === 'sent';
  }
}
