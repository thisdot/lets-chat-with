import { storiesOf } from '@storybook/angular';
import { ThemeService } from '@conf-match/shared/theme';
import { ContextMenuButtonComponent } from './context-menu-button.component';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedStorybookHelpersModule } from '@conf-match/shared/storybook-helpers';

const moduleMetadata = {
  imports: [RouterTestingModule, SharedStorybookHelpersModule, SharedUiIconsModule],
  declarations: [ContextMenuButtonComponent],
  providers: [ThemeService],
};

storiesOf('Shared/ContextMenuButton', module)
  .add('Button', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <cm-context-menu-button
          iconName="Camera"
          text="Camera"
        ></cm-context-menu-button>
      </cm-theme>
    `,
  }))
  .add('Link', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <cm-context-menu-button
          iconName="Flag"
          text="Link"
          routerLink="address"
        ></cm-context-menu-button>
      </cm-theme>
    `,
  }))
  .add('With Content', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <cm-context-menu-button
          iconName="Close"
          text="Button"
        >
          <cm-icon name="LeftChevron" size="lg"></cm-icon>
        </cm-context-menu-button>
      </cm-theme>
    `,
    styles: [
      `
      cm-context-menu-button {
        width: 300px;
      }

      cm-icon {
        transform: rotate(90deg);
      }
    `,
    ],
  }));
