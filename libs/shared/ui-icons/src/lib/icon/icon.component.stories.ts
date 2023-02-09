import { storiesOf } from '@storybook/angular';
import { IconComponent } from './icon.component';

const moduleMetadata = {
  declarations: [IconComponent],
};

storiesOf('Shared/Icon', module)
  .add('Flash', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="Flash"></cm-icon>
    `,
  }))
  .add('MessageBubble', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="MessageBubble"></cm-icon>
    `,
  }))
  .add('MessageBubbleFilled', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="MessageBubbleFilled"></cm-icon>
    `,
  }))
  .add('MessageBubbleTyping', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="MessageBubbleTyping"></cm-icon>
    `,
  }))
  .add('MultipleActionsFlash', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="MultipleActionsFlash"></cm-icon>
    `,
  }))
  .add('MultipleNeutral', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="MultipleNeutral"></cm-icon>
    `,
  }))
  .add('Search', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="Search"></cm-icon>
    `,
  }))
  .add('PersonNeutral', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="PersonNeutral"></cm-icon>
    `,
  }))
  .add('PersonAdd', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="PersonAdd"></cm-icon>
    `,
  }))
  .add('PersonFlash', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="PersonFlash"></cm-icon>
    `,
  }))
  .add('PersonCircle', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="PersonCircle"></cm-icon>
    `,
  }))
  .add('TeamMeetingFlash', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="TeamMeetingFlash"></cm-icon>
    `,
  }))
  .add('SwipeLeft', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="SwipeLeft"></cm-icon>
    `,
  }))
  .add('SwipeRight', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="SwipeRight"></cm-icon>
    `,
  }))
  .add('EyeOpen', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="EyeOpen"></cm-icon>
    `,
  }))
  .add('EyeClosed', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="EyeClosed"></cm-icon>
    `,
  }))
  .add('LeftChevron', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="LeftChevron"></cm-icon>
    `,
  }))
  .add('Share', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="Share"></cm-icon>
    `,
  }))
  .add('SettingsWheel', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="SettingsWheel"></cm-icon>
    `,
  }))
  .add('Flag', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="Flag"></cm-icon>
    `,
  }))
  .add('MessageExclamationMark', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="MessageExclamationMark"></cm-icon>
    `,
  }))
  .add('Camera', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="Camera"></cm-icon>
    `,
  }))
  .add('Spam', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="Spam"></cm-icon>
    `,
  }))
  .add('SocialTwitter', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="SocialTwitter"></cm-icon>
    `,
  }))
  .add('SocialLinkedIn', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="SocialLinkedIn"></cm-icon>
    `,
  }))
  .add('SocialFacebook', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="SocialFacebook"></cm-icon>
    `,
  }))
  .add('CircularLogoFacebook', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="CircularLogoFacebook"></cm-icon>
    `,
  }))
  .add('CircularLogoTwitter', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="CircularLogoTwitter"></cm-icon>
    `,
  }))
  .add('CircularLogoLinkedIn', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="CircularLogoLinkedIn"></cm-icon>
    `,
  }))
  .add('Close', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="Close"></cm-icon>
    `,
  }))
  .add('WavingHand', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="WavingHand"></cm-icon>
    `,
  }))
  .add('Info', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="Info"></cm-icon>
    `,
  }))
  .add('Back', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="Back"></cm-icon>
    `,
  }))
  .add('More', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="More"></cm-icon>
    `,
  }))
  .add('SingleMap', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="SingleMap"></cm-icon>
    `,
  }))
  .add('Plus', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="Plus"></cm-icon>
    `,
  }))
  .add('Refresh', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="Refresh"></cm-icon>
    `,
  }))
  .add('List', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="List"></cm-icon>
    `,
  }))
  .add('Question', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="Question"></cm-icon>
    `,
  }))
  .add('Settings', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="Settings"></cm-icon>
    `,
  }))
  .add('Lock', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="Lock"></cm-icon>
    `,
  }))
  .add('Email', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="Email"></cm-icon>
    `,
  }))
  .add('HyperLink', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="HyperLink"></cm-icon>
    `,
  }))
  .add('QR', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="QR"></cm-icon>
    `,
  }))
  .add('Unavailable', () => ({
    moduleMetadata,
    template: `
      <cm-icon name="Unavailable"></cm-icon>
    `,
  }));
