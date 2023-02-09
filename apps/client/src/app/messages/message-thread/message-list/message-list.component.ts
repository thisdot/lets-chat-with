import { KeyValue } from '@angular/common';
import {
  Component,
  Input,
  EventEmitter,
  NgZone,
  HostBinding,
  Output,
  AfterViewInit,
  OnChanges,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';
import { CdkScrollable } from '@angular/cdk/overlay';
import { map, pairwise, filter } from 'rxjs/operators';
import { ChatThread, MatchAttendee, Message } from '@conf-match/api';

const TRIGGER_OFFSET_TOP = 60;

@Component({
  selector: 'cm-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageListComponent implements AfterViewInit, OnChanges {
  @Input()
  attendeeId: string;

  @Input()
  matchAttendee: MatchAttendee;

  @Input()
  messageThread: ChatThread;

  @Input()
  messages: { items: Array<Message> };

  @Input()
  isLoading: boolean;

  @Output()
  loadNextPage = new EventEmitter();

  @Output()
  updateAttendeeLastReadAt = new EventEmitter();

  @ViewChild(CdkScrollable) scroller: CdkScrollable;

  groupedMessages: Record<string, Array<Message>> = {};
  today = new Date().toISOString().split('T')[0];

  constructor(private ngZone: NgZone) {}

  @HostBinding('class.cm-message-list')
  get defaultClass() {
    return true;
  }

  ngAfterViewInit() {
    // Update last read at when opening the thread
    this.updateAttendeeLastReadAt.emit();

    this.scroller.scrollTo({ bottom: 0 });
    this.scroller
      .elementScrolled()
      .pipe(
        map(() => this.scroller.measureScrollOffset('top')),
        pairwise(),
        filter(([offSetTop1, offsetTop2]) => {
          const isScrollingUp = offsetTop2 < offSetTop1;
          const isBelowOrEqualToTriggerOffset = offsetTop2 <= TRIGGER_OFFSET_TOP;

          return isScrollingUp && isBelowOrEqualToTriggerOffset;
        })
      )
      .subscribe(() => {
        this.ngZone.run(() => {
          this.loadNextPage.emit();
        });
      });
  }

  ngOnChanges(changes) {
    if (changes && changes.messages) {
      this.groupedMessages = this.messages && this.groupMessages(this.messages.items);

      if (this.scroller) {
        const bottom = this.scroller.measureScrollOffset('bottom');
        // Update last read at receiving or sending a message
        this.updateAttendeeLastReadAt.emit();
        setTimeout(() => {
          this.scroller.scrollTo({ bottom });
        });
      }
    }
  }

  trackByGroup(_, group: KeyValue<string, Record<string, Message[]>>) {
    return group.key;
  }

  trackByMessageId(_, message: Message) {
    return message.id;
  }

  private groupMessages(messages: Array<Message>): Record<string, Array<Message>> {
    return messages.reduce((messageGroups, message) => {
      const date = message.createdAt.split('T')[0];
      const dateResult = messageGroups[date];
      if (dateResult) {
        const index = dateResult.findIndex((m) => m.createdAt > message.createdAt);

        if (index === -1) {
          dateResult.push(message);
        } else {
          dateResult.splice(index, 0, message);
        }
      } else {
        messageGroups[date] = [message];
      }

      return messageGroups;
    }, {});
  }
}
