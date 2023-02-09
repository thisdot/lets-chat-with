import { Component, Input, HostBinding } from '@angular/core';

export type IconName =
  | 'Flash'
  | 'FlashFilled'
  | 'MessageBubble'
  | 'MessageBubbleFilled'
  | 'MessageBubbleTyping'
  | 'MessageBubbleTypingFilled'
  | 'MultipleActionsFlash'
  | 'MultipleNeutral'
  | 'Search'
  | 'SearchFilled'
  | 'PersonNeutral'
  | 'PersonAdd'
  | 'PersonFlash'
  | 'PersonCircle'
  | 'PersonFilled'
  | 'TeamMeetingFlash'
  | 'SwipeLeft'
  | 'SwipeRight'
  | 'SocialLinkedIn'
  | 'SocialTwitter'
  | 'SocialFacebook'
  | 'EyeOpen'
  | 'EyeClosed'
  | 'LeftChevron'
  | 'Share'
  | 'SettingsWheel'
  | 'Flag'
  | 'MessageExclamationMark'
  | 'Camera'
  | 'Spam'
  | 'CircularLogoFacebook'
  | 'CircularLogoTwitter'
  | 'CircularLogoLinkedIn'
  | 'Close'
  | 'WavingHand'
  | 'Info'
  | 'Back'
  | 'SingleMan'
  | 'Plus'
  | 'Refresh'
  | 'Unavailable'
  | 'List'
  | 'Question'
  | 'Settings'
  | 'Lock'
  | 'Email'
  | 'RightChevronBold'
  | 'DownChevronBold'
  | 'CheckBadge'
  | 'Edit'
  | 'Calendar'
  | 'KebabMenu'
  | 'HamburgerMenu'
  | 'Logout';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';

@Component({
  selector: 'cm-icon',
  template: `
    <svg>
      <use attr.xlink:href="assets/icons/sprite.svg#{{ name }}"></use>
    </svg>
  `,
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  @Input() name?: IconName;
  @Input() size: IconSize = 'md';

  @HostBinding('class.cm-icon')
  get isIcon() {
    return true;
  }

  @HostBinding('class.cm-icon--xs')
  get isExtraSmall() {
    return this.size === 'xs';
  }

  @HostBinding('class.cm-icon--sm')
  get isSmall() {
    return this.size === 'sm';
  }

  @HostBinding('class.cm-icon--md')
  get isMedium() {
    return this.size === 'md';
  }

  @HostBinding('class.cm-icon--lg')
  get isLarge() {
    return this.size === 'lg';
  }

  @HostBinding('class.cm-icon--xl')
  get isExtraLarge() {
    return this.size === 'xl';
  }

  @HostBinding('class.cm-icon--xxl')
  get isDoubleExtraLarge() {
    return this.size === 'xxl';
  }

  @HostBinding('class.cm-icon--xxxl')
  get isTripleExtraLarge() {
    return this.size === 'xxxl';
  }
}
