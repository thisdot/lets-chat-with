import { Component, Input, forwardRef, HostBinding, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'cm-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  // indicate the state of the checkbox to be checked or not
  // tslint:disable-next-line: no-input-rename
  @Input('value') _value = false;
  // indicate the state of the checkbox to be disabled or not
  @Input() disabled = false;
  // indicate the label displayed after the checkbox, if no label
  // is provided, will only display a checkbox
  @Input() label?: string;

  // indicate if label should be displayed
  @Input() showLabel = true;

  private _ID = '';
  @HostBinding('attr.id')
  externalId: string | null = '';

  @Input()
  set id(value: string) {
    this._ID = value;
    this.externalId = null;
  }

  get id() {
    return this._ID;
  }

  constructor() {}

  @HostListener('keyup.space')
  @HostListener('keyup.enter')
  onClick() {
    this.value = !this._value;
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  get value() {
    return this._value;
  }

  set value(checkedVal) {
    this._value = checkedVal;
    this.onChange(checkedVal);
    this.onTouched();
  }

  registerOnChange(fn: () => any) {
    this.onChange = fn;
  }

  writeValue(value: boolean) {
    this._value = !!value;
  }

  registerOnTouched(fn: () => any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
