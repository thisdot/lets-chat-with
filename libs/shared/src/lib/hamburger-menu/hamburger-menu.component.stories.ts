import { SharedStorybookHelpersModule } from '@conf-match/shared/storybook-helpers';
import { HamburgerMenuModule } from './hamburger-menu.module';
import { storiesOf } from '@storybook/angular';

const moduleMetadata = {
  imports: [SharedStorybookHelpersModule, HamburgerMenuModule],
};

storiesOf('Shared/HamburgerMenu', module).add('Default', () => ({
  moduleMetadata,
  template: `
      <cm-theme>
        <cm-hamburger-menu>
          <cm-hamburger-menu-item
            label="Connect"
            iconName="SearchFilled"
          ></cm-hamburger-menu-item>
          <cm-hamburger-menu-item
            label="Matches"
            iconName="FlashFilled"
          ></cm-hamburger-menu-item>
          <cm-hamburger-menu-item
            label="Messages"
            iconName="MessageBubbleTypingFilled"
          ></cm-hamburger-menu-item>
          <cm-hamburger-menu-item
            label="Profile"
            iconName="PersonFilled"
          ></cm-hamburger-menu-item>
        </cm-hamburger-menu>
      </cm-theme>
    `,
}));
