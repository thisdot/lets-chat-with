import { Component, HostBinding, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { ChatThread, MatchAttendee } from '@conf-match/api';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'cm-message-thread-list-item',
  templateUrl: './message-thread-list-item.component.html',
  styleUrls: ['./message-thread-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageThreadListItemComponent implements OnChanges {
  @Input()
  messageThread: ChatThread;

  attendee: MatchAttendee;
  lastMessage: string;
  hasUnreadMessages: boolean;

  @HostBinding('class.cm-message-thread-list-item')
  defaultClass() {
    return true;
  }

  constructor(private translocoService: TranslocoService) {}

  ngOnChanges(changes) {
    if (changes.messageThread) {
      this.attendee = this.messageThread.match.attendee;
      this.lastMessage = this.messageThread.messages.items?.length
        ? this.messageThread.messages.items[0].content
        : this.translocoService.translate('messages.placeholderMessage');

      this.hasUnreadMessages = this.calculateHasUnreadMessages();
    }
  }

  private calculateHasUnreadMessages() {
    const lastMessageAt = new Date(this.messageThread.lastMessageAt);
    const lastReadAt = new Date(
      this.messageThread.match.attendee1Id === this.attendee.id
        ? this.messageThread.attendee1LastReadAt
        : this.messageThread.attendee2LastReadAt
    );

    return lastMessageAt > lastReadAt;
  }
}
