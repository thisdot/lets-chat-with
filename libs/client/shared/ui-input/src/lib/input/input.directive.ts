import { Directive, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector: 'input[cmInput]',
})
export class InputDirective {
  constructor(public el: ElementRef) {}

  get nativeElement() {
    return this.el.nativeElement;
  }

  @HostBinding('class.cm-input')
  get defaultClass() {
    return true;
  }
}
