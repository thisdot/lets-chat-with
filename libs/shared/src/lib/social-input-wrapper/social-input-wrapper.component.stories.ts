import { storiesOf } from '@storybook/angular';
import { ThemeService } from '@conf-match/shared/theme';
import { SocialInputWrapperComponent } from './social-input-wrapper.component';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { InputDirective } from '@conf-match/client/shared/ui-input';
import { SharedStorybookHelpersModule } from '@conf-match/shared/storybook-helpers';

const moduleMetadata = {
  declarations: [SocialInputWrapperComponent, InputDirective],
  imports: [SharedStorybookHelpersModule, SharedUiIconsModule],
  providers: [ThemeService],
};

storiesOf('Shared/SocialInputWrapper', module).add('LinkedIn', () => ({
  moduleMetadata,
  template: `
      <cm-theme>
        <cm-social-input-wrapper platform="linkedin">
          <input cmInput class="cm-input" placeholder="@username" />
        </cm-social-input-wrapper>
      </cm-theme>
    `,
}));
