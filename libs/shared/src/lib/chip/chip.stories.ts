import { storiesOf } from '@storybook/angular';
import { ThemeService } from '@conf-match/shared/theme';
import { ChipComponent } from './chip.component';
import { SharedStorybookHelpersModule } from '@conf-match/shared/storybook-helpers';

const moduleMetadata = {
  declarations: [ChipComponent],
  imports: [SharedStorybookHelpersModule],
  providers: [ThemeService],
};

storiesOf('Shared/Chip', module)
  .add('Primary (Default)', () => ({
    moduleMetadata,
    template: `
    <cm-theme>
      <cm-chip>Partner</cm-chip>
    </cm-theme>
  `,
  }))
  .add('Secondary', () => ({
    moduleMetadata,
    template: `
    <cm-theme>
      <cm-chip type="secondary">Partner</cm-chip>
    </cm-theme>
  `,
  }));
