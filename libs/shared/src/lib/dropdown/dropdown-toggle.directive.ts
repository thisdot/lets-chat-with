import {
  Directive,
  Input,
  ElementRef,
  HostListener,
  EventEmitter,
  Output,
  HostBinding,
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { DropdownShowTypes } from './dropdown.show-types.enum';

@Directive({
  // tslint:disable-next-line:directive-selector
  exportAs: 'cmDropdownToggle',
  // tslint:disable-next-line: directive-selector
  selector: 'cm-dropdown-toggle',
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    class: 'cm-dropdown-toggle',
  },
})
export class DropdownToggleDirective {
  @Input() showEvent: DropdownShowTypes = DropdownShowTypes.Click;

  @HostBinding('class.disabled')
  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(disabled: boolean) {
    this._disabled = coerceBooleanProperty(disabled);
  }

  @Output() toggle = new EventEmitter<Event>();

  readonly element: HTMLElement;
  private _disabled = false;

  constructor(private readonly el: ElementRef<HTMLElement>) {
    this.element = this.el.nativeElement;
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    if (this.showEvent === DropdownShowTypes.Click && !this.disabled) {
      event.preventDefault();
      this.toggle.emit(event);
    }
  }

  @HostListener('contextmenu', ['$event'])
  onContextmenu(event: Event) {
    if (this.showEvent === DropdownShowTypes.Contextmenu && !this.disabled) {
      event.preventDefault();
      this.toggle.emit(event);
    }
  }

  @HostListener('dblclick', ['$event'])
  onDblclick(event: Event) {
    if (this.showEvent === DropdownShowTypes.Dblclick && !this.disabled) {
      event.preventDefault();
      this.toggle.emit(event);
    }
  }
}
