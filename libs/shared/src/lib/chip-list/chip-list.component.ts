import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { IdentifierModel, InterestModel } from '@conf-match/api';

@Component({
  selector: 'cm-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss'],
})
export class ChipListComponent {
  @Input()
  title?: string;

  @Input()
  items?: Array<InterestModel | IdentifierModel>;

  @Input()
  type?: 'primary' | 'secondary' = 'primary';

  @Output()
  edit = new EventEmitter();

  @HostBinding('class.cm-chip-list')
  get defaultClass() {
    return true;
  }
}
