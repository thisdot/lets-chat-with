import { Component, AfterViewInit, ContentChild, Renderer2, HostBinding } from '@angular/core';
import { IconName } from '@conf-match/shared/ui-icons';
import { InputDirective } from '@conf-match/client/shared/ui-input';

@Component({
  selector: 'cm-password-wrapper',
  templateUrl: './password-wrapper.component.html',
  styleUrls: ['./password-wrapper.component.scss'],
})
export class PasswordWrapperComponent implements AfterViewInit {
  revealed = false;
  @ContentChild(InputDirective) input?: InputDirective;

  constructor(private _renderer: Renderer2) {}

  @HostBinding('class.cm-password-wrapper')
  get defaultClass() {
    return true;
  }

  @HostBinding('class.cm-password-wrapper--filled')
  get isFilled() {
    return this.input && this.input.nativeElement.value;
  }

  get iconName(): IconName {
    if (this.revealed) {
      return 'EyeOpen';
    }
    return 'EyeClosed';
  }

  ngAfterViewInit() {
    if (!this.input) {
      throw new Error('Expected a password element');
    } else {
      this._setInputType('password');
      this._renderer.addClass(this.input.nativeElement, 'cm-password-wrapper__input');
    }
  }

  toggleReveal() {
    this.revealed = !this.revealed;

    if (this.revealed) {
      this._setInputType('text');
    } else {
      this._setInputType('password');
    }
  }

  private _setInputType(type: 'text' | 'password') {
    this._renderer.setProperty(this.input?.nativeElement, 'type', type);
  }
}
