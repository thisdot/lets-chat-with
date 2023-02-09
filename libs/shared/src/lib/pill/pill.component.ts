import {
  Component,
  Input,
  forwardRef,
  HostBinding,
  OnInit,
  ElementRef,
  HostListener,
  ViewChild,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'cm-pill',
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PillComponent),
      multi: true,
    },
  ],
})
export class PillComponent implements ControlValueAccessor, OnInit {
  @Input() type: 'primary' | 'secondary' = 'primary';
  @Input() trueValue: any = true;
  @Input() falseValue: any = false;

  @Output() tryUpdateWhenDisabled: EventEmitter<any> = new EventEmitter();

  @ViewChild('checkbox') checkbox?: ElementRef;

  active = false;
  disabled = false;

  @HostBinding('class.cm-pill')
  get isPill() {
    return true;
  }

  @HostBinding('class.cm-pill--primary')
  get isPrimary() {
    return this.type === 'primary';
  }

  @HostBinding('class.cm-pill--secondary')
  get isSecondary() {
    return this.type === 'secondary';
  }

  @HostBinding('class.cm-pill--active')
  get isActive() {
    return this.active;
  }

  @HostListener('mousedown')
  mousedown() {
    if (this.disabled) {
      this.tryUpdateWhenDisabled.emit();
    }
  }

  @HostListener('keypress', ['$event'])
  keyPressed(event: KeyboardEvent) {
    if (this.disabled) {
      this.tryUpdateWhenDisabled.emit();
      return;
    }
    if ((event.key === 'Enter' || event.key === ' ') && this.checkbox) {
      this.checkbox.nativeElement.checked = !this.checkbox.nativeElement.checked;
      this.onClick();
    }
  }

  onClick() {
    if (this.disabled || !this.checkbox) {
      // Don't fire tryUpdateWhenDisabled since it should be fired in the mousedown
      // event listener
      return;
    }
    this.onTouched();
    this.triggerChange(this.checkbox.nativeElement.checked);
  }

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.disabled = false;
  }

  triggerChange(currentState: boolean) {
    this.active = currentState;
    const valueToEmit = currentState ? this.trueValue : this.falseValue;
    this.onChange(valueToEmit);
  }

  writeValue(selectedValue: string): void {
    this.active = this.trueValue === selectedValue;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (selectedValue: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
