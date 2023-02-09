import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'cm-text-field-wrapper',
  templateUrl: './text-field-wrapper.component.html',
  styleUrls: ['./text-field-wrapper.component.scss'],
})
export class TextFieldWrapperComponent {
  @Input() label = '';
  @Input() errors: string[] = [];
  @Input() info = '';
  @Input() name = '';

  @HostBinding('class.cm-text-field-wrapper')
  get defaultClass() {
    return true;
  }
}
