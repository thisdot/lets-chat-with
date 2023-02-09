import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'cm-message-avatar',
  templateUrl: './message-avatar.component.html',
  styleUrls: ['./message-avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageAvatarComponent {
  @Input() avatarUrl: string;
}
