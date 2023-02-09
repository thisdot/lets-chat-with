import { Component, HostBinding, Input } from '@angular/core';
import { IconName } from '@conf-match/shared/ui-icons';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[cm-list-item]',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  @Input() icon?: IconName;

  @Input() text?: string;

  @HostBinding('class.cm-list-item--active')
  @Input()
  active = false;

  @HostBinding('class.cm-list-item')
  get defaultClass() {
    return true;
  }

  constructor() {}
}
