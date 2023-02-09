import { ElementRef, Directive } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  exportAs: 'cmDropdownMenu',
  // tslint:disable-next-line: directive-selector
  selector: 'cm-dropdown-menu',
  // tslint:disable-next-line: no-host-metadata-property
  host: { class: 'cm-dropdown-menu' },
})
export class DropdownMenuDirective {
  readonly element: HTMLElement;

  constructor(private readonly el: ElementRef<HTMLElement>) {
    this.element = this.el.nativeElement;
  }
}
