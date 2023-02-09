import {
  Component,
  ViewChildren,
  QueryList,
  AfterViewInit,
  Renderer2,
  forwardRef,
  Input,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputDirective } from '@conf-match/shared';

export const SecurityCodeSize = 6;

@Component({
  selector: 'cm-security-code-input',
  templateUrl: './security-code-input.component.html',
  styleUrls: ['./security-code-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SecurityCodeInputComponent),
    },
  ],
})
export class SecurityCodeInputComponent implements ControlValueAccessor, OnInit, AfterViewInit {
  @Input() invalid: boolean;

  @Input() securityCodeSize;

  @ViewChildren(InputDirective) inputsList: QueryList<InputDirective>;

  private _onChange: any;
  private _onTouched: any;
  placeholders: number[];

  inputs: HTMLInputElement[] = [];
  value = '';

  constructor(private _renderer: Renderer2) {}

  ngOnInit(): void {
    this.securityCodeSize = this.securityCodeSize || SecurityCodeSize;
    this.placeholders = Array(this.securityCodeSize).fill(0);
  }

  ngAfterViewInit() {
    if (this.inputsList) {
      this.inputsList.forEach((item) => {
        this.inputs.push(item.nativeElement);
      });
    }

    if (this.value) {
      this.writeValue(this.value);
    }
  }

  writeValue(value: string): void {
    this.value = value;
    if (this.inputs) {
      let parts = value ? value.split('') : [];

      if (parts.length > this.inputs.length) {
        parts = parts.slice(0, this.inputs.length);
      }
      if (parts.length < this.inputs.length) {
        for (let i = parts.length; i < this.inputs.length; i++) {
          parts.push('');
        }
      }

      this.inputs.forEach((input, idx: number) => {
        this._renderer.setProperty(input, 'value', parts[idx]);
      });
    }
  }

  setDisabledState(isDisabled: boolean): void {
    if (this.inputs) {
      this.inputs.forEach((input) => {
        this._renderer.setProperty(input, 'disabled', isDisabled);
      });
    }
  }

  registerOnChange(fn: (code: string) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  private _getValue() {
    return this.inputs ? this.inputs.map((input) => input.value).join('') : '';
  }

  onFocus(event: Event, idx: number) {
    (event.target as HTMLInputElement).select();
  }

  onBlur(event: Event, idx: number) {
    if (this._onTouched) {
      this._onTouched();
    }
  }

  onKeydown(event: KeyboardEvent, idx: number) {
    if (['Backspace', 'Tab', 'Delete', 'Escape', 'Enter'].find((code) => code === event.key)) {
      return;
    }
    if (
      (event.key === 'a' || event.key === 'v' || event.key === 'c') &&
      (event.ctrlKey || event.metaKey === true)
    ) {
      return;
    }
    // tslint:disable-next-line:radix
    const n = parseInt(event.key);
    if (!isNaN(n)) {
      return;
    }
    event.preventDefault();
  }

  onInput(event: Event, idx: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    if (value && value.length === 1) {
      if (idx < this.securityCodeSize - 1) {
        this.inputs[idx + 1].focus();
      }
      if (this._onChange) {
        this._onChange(this._getValue());
      }
    }
  }

  onBackspace(event: KeyboardEvent, idx: number) {
    const value = (event.target as HTMLInputElement).value;
    if ((!value || value.length === 0) && idx > 0) {
      this.inputs[idx - 1].focus();
    }
    if (this._onChange) {
      this._onChange(this._getValue());
    }
  }

  onPaste(event: ClipboardEvent, idx: number) {
    event.preventDefault();
    event.stopPropagation();
    const data = event.clipboardData ? event.clipboardData.getData('text').trim() : undefined;
    if (!data) {
      return;
    }
    const values = data.split('');
    for (let i = 0; i < values.length; i++) {
      if (i === this.securityCodeSize) {
        break;
      }
      this.inputs[i].value = values[i];
    }
    if (values.length < this.securityCodeSize) {
      this.inputs[values.length].focus();
    }
    if (this._onChange) {
      this._onChange(this._getValue());
    }
  }
}
