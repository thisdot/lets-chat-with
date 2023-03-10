import { Component, HostBinding, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cm-conference-card',
  templateUrl: './conference-card.component.html',
  styleUrls: ['./conference-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConferenceCardComponent {
  @Input()
  conference?: {
    title: string;
    subTitle: string;
    attendeeCount: number;
    chats: number;
  };

  @HostBinding('class.cm-conference-card--active')
  @Input()
  active = false;

  @HostBinding('class.cm-conference-card')
  get defaultClass() {
    return true;
  }
}
