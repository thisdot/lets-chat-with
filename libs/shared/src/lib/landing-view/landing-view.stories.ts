import { storiesOf } from '@storybook/angular';
import { ThemeService } from '@conf-match/shared/theme';
import { LandingViewComponent } from './landing-view.component';
import { SharedStorybookHelpersModule } from '@conf-match/shared/storybook-helpers';

const moduleMetadata = {
  declarations: [LandingViewComponent],
  imports: [SharedStorybookHelpersModule],
  providers: [ThemeService],
};

storiesOf('Shared/LandingView', module).add('Default', () => ({
  moduleMetadata,
  template: `
      <cm-theme>
        <cm-landing-view>Content</cm-landing-view>
      </cm-theme>
    `,
}));
