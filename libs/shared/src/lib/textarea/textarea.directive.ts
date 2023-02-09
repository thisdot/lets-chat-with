import { Directive, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector: 'textarea[cmTextarea]',
})
export class TextareaDirective {
  constructor(public el: ElementRef) {}

  get nativeElement() {
    return this.el.nativeElement;
  }

  @HostBinding('class.cm-textarea')
  get defaultClass() {
    return true;
  }
}
