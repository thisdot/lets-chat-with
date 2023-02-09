import {
  Component,
  Input,
  ContentChild,
  AfterContentInit,
  HostBinding,
  Renderer2,
  Directive,
} from '@angular/core';
import { InputDirective } from '@conf-match/client/shared/ui-input';

@Directive({
  selector: '[cmInputSuffix]',
})
export class InputSuffixDirective {}

@Directive({
  selector: '[cmInputPrefix]',
})
export class InputPrefixDirective {}

@Component({
  selector: 'cm-input-append-wrapper',
  templateUrl: './input-append-wrapper.component.html',
  styleUrls: ['./input-append-wrapper.component.scss'],
})
export class InputAppendWrapperComponent implements AfterContentInit {
  @ContentChild(InputDirective) input?: InputDirective;
  @ContentChild(InputPrefixDirective) prefix?: InputPrefixDirective;
  @ContentChild(InputSuffixDirective) suffix?: InputSuffixDirective;

  constructor(private _renderer: Renderer2) {}

  @HostBinding('class.cm-input-append-wrapper')
  get defaultClass() {
    return true;
  }

  @HostBinding('class.cm-input-append-wrapper--prefix')
  get isPrefix() {
    return !!this.prefix;
  }

  @HostBinding('class.cm-input-append-wrapper--suffix')
  get isSuffix() {
    return !!this.suffix;
  }

  ngAfterContentInit() {
    if (!this.input) {
      throw new Error('Expected an InputDirective');
    }

    this._renderer.addClass(this.input.nativeElement, 'cm-input-append-wrapper__input');
  }
}
