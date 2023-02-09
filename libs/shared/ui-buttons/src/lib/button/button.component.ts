import { Component, Input, HostBinding } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'button[cm-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() cmButtonType: 'primary' | 'secondary' | 'full-width' | 'borderless' = 'primary';

  @HostBinding('class.cm-button--floating')
  @Input()
  floating = false;

  @HostBinding('class.cm-button')
  get isButton() {
    return true;
  }

  @HostBinding('class.cm-button--primary')
  get isPrimary() {
    return this.cmButtonType === 'primary';
  }

  @HostBinding('class.cm-button--secondary')
  get isSecondary() {
    return this.cmButtonType === 'secondary';
  }

  @HostBinding('class.cm-button--full-width')
  get isFullWidth() {
    return this.cmButtonType === 'full-width';
  }

  @HostBinding('class.cm-button--borderless')
  get isBorderless() {
    return this.cmButtonType === 'borderless';
  }
}
