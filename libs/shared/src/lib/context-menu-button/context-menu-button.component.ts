import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { IconName } from '@conf-match/shared/ui-icons';

@Component({
  selector: 'cm-context-menu-button',
  templateUrl: './context-menu-button.component.html',
  styleUrls: ['./context-menu-button.component.scss'],
})
export class ContextMenuButtonComponent {
  @Input() iconName?: IconName;
  @Input() text?: string;
  @Input() routerLink?: string;

  @Output() buttonClick = new EventEmitter<void>();

  @HostBinding('class.cm-context-menu-button')
  get defaultClass() {
    return true;
  }
}
