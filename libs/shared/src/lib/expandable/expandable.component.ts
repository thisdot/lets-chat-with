import { Component, HostBinding, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cm-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss'],
})
export class ExpandableComponent {
  @HostBinding('class.cm-expandable--visible')
  @Input()
  visible = false;

  @Output() toggle = new EventEmitter<boolean>();

  @HostBinding('class.cm-expandable')
  get defaultClass() {
    return true;
  }

  onToggle() {
    this.toggle.emit(!this.visible);
  }
}
