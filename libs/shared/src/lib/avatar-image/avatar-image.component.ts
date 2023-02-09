import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cm-avatar-image',
  templateUrl: './avatar-image.component.html',
  styleUrls: ['./avatar-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarImageComponent {
  @Input() avatarUrl?: string;
  @Input() rounded = true;
  @Input() bordered = true;

  constructor() {}
}
