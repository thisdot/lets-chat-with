import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cm-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipComponent {
  @Input() type: 'primary' | 'secondary' = 'primary';

  @HostBinding('class.cm-chip')
  get isChip() {
    return true;
  }

  @HostBinding('class.cm-chip--primary')
  get isPrimary() {
    return this.type === 'primary';
  }

  @HostBinding('class.cm-chip--secondary')
  get isSecondary() {
    return this.type === 'secondary';
  }
}
