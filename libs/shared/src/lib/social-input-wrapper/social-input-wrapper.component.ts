import {
  Component,
  Input,
  ContentChild,
  AfterContentInit,
  HostBinding,
  Renderer2,
} from '@angular/core';
import { IconName } from '@conf-match/shared/ui-icons';
import { InputDirective } from '@conf-match/client/shared/ui-input';

type SocialPlatform = 'linkedin' | 'fb' | 'twitter';

const IconMap: { [key in SocialPlatform]: IconName } = {
  linkedin: 'SocialLinkedIn',
  fb: 'SocialFacebook',
  twitter: 'SocialTwitter',
};

@Component({
  selector: 'cm-social-input-wrapper',
  templateUrl: './social-input-wrapper.component.html',
  styleUrls: ['./social-input-wrapper.component.scss'],
})
export class SocialInputWrapperComponent implements AfterContentInit {
  @Input() platform?: SocialPlatform;
  @ContentChild(InputDirective) input?: InputDirective;

  constructor(private _renderer: Renderer2) {}

  @HostBinding('class.cm-social-input-wrapper')
  get defaultClass() {
    return true;
  }

  get iconName(): IconName | null {
    return this.platform ? IconMap[this.platform] : null;
  }

  ngAfterContentInit() {
    if (!this.input) {
      throw new Error('Expected an InputDirective');
    }

    this._renderer.addClass(this.input.nativeElement, 'cm-social-input-wrapper__input');

    this._renderer.listen(this.input.nativeElement, 'input', this._extractUsername);
  }

  private _extractUsername(e: Event) {
    const el = e.target as HTMLInputElement;

    if (el.value.startsWith('@')) {
      el.value = el.value.slice(1, el.value.length);
    } else if (el.value.indexOf('/') > -1) {
      el.value =
        el.value
          .split('/')
          .filter((p) => !!p)
          .pop() || '';
    }
  }
}
