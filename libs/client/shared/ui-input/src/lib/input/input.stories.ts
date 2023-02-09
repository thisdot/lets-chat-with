import { storiesOf } from '@storybook/angular';
import { ThemeService } from '@conf-match/shared/theme';
import { InputDirective } from './input.directive';
import { SharedStorybookHelpersModule } from '@conf-match/shared/storybook-helpers';

const moduleMetadata = {
  declarations: [InputDirective],
  imports: [SharedStorybookHelpersModule],
  providers: [ThemeService],
};

storiesOf('Shared/Input', module).add('Default', () => ({
  moduleMetadata,
  template: `
      <cm-theme>
        <input cmInput />
      </cm-theme>
    `,
}));
