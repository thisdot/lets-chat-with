import { Component, Input, HostBinding } from '@angular/core';

type Platform = 'facebook' | 'twitter' | 'linkedin';

@Component({
  selector: 'cm-social-auth-buttons',
  templateUrl: './social-auth-buttons.component.html',
  styleUrls: ['./social-auth-buttons.component.scss'],
})
export class SocialAuthButtonsComponent {
  @HostBinding('class.cm-social-auth-buttons--colored')
  @Input()
  colored: boolean;

  @HostBinding('class.cm-social-auth-buttons')
  get defaultClass() {
    return true;
  }

  onSocialSignUp(platform: Platform) {
    console.log(platform);
  }
}
