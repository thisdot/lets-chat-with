import { storiesOf } from '@storybook/angular';
import { ButtonComponent } from './button.component';
import { ThemeService } from '@conf-match/shared/theme';
import { SharedStorybookHelpersModule } from '@conf-match/shared/storybook-helpers';

const moduleMetadata = {
  declarations: [ButtonComponent],
  imports: [SharedStorybookHelpersModule],
  providers: [ThemeService],
};

storiesOf('Shared/Button', module)
  .add('Primary (default)', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <button cm-button>Click Me</button>
      </cm-theme>
    `,
  }))
  .add('Secondary', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <button cm-button cmButtonType="secondary">Click Me</button>
      </cm-theme>
    `,
  }))
  .add('Full-Width', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <button cm-button cmButtonType="full-width">Click Me</button>
      </cm-theme>
    `,
  }))
  .add('Borderless', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <button cm-button cmButtonType="borderless">Click Me</button>
      </cm-theme>
    `,
  }))
  .add('Disabled', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <button cm-button [disabled]="true">Click Me</button>
      </cm-theme>
    `,
  }));
