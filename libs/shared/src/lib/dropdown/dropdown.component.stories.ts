import { SharedStorybookHelpersModule } from '@conf-match/shared/storybook-helpers';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { storiesOf } from '@storybook/angular';
import { HamburgerMenuModule } from '../hamburger-menu/hamburger-menu.module';
import { DropdownModule } from './dropdown.module';

const moduleMetadata = {
  imports: [SharedStorybookHelpersModule, DropdownModule, HamburgerMenuModule, SharedUiIconsModule],
};

storiesOf('Shared/Dropdown', module).add('Default', () => ({
  moduleMetadata,
  template: `
      <cm-theme>
        <cm-dropdown>

          <cm-dropdown-toggle>
            <cm-icon name="HamburgerMenu" role="button" aria-label="Menu" size="xl"></cm-icon>
          </cm-dropdown-toggle>

          <cm-dropdown-menu>
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
          </cm-dropdown-menu>

        </cm-dropdown>
      </cm-theme>
    `,
}));
