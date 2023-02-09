import { storiesOf } from '@storybook/angular';
import { ThemeService } from '@conf-match/shared/theme';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { PasswordWrapperComponent } from './password-wrapper.component';
import { InputDirective } from '@conf-match/client/shared/ui-input';
import { SharedStorybookHelpersModule } from '@conf-match/shared/storybook-helpers';

const moduleMetadata = {
  declarations: [InputDirective, PasswordWrapperComponent],
  imports: [SharedStorybookHelpersModule, SharedUiIconsModule],
  providers: [ThemeService],
};

storiesOf('Shared/PasswordWrapper', module).add('Default', () => ({
  moduleMetadata,
  template: `
      <cm-theme>
        <cm-password-wrapper>
          <input cmInput />
        </cm-password-wrapper>
      </cm-theme>
    `,
}));
