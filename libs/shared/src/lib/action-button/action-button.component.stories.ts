import { storiesOf } from '@storybook/angular';
import { ActionButtonComponent } from './action-button.component';
import { ThemeService } from '@conf-match/shared/theme';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { SharedStorybookHelpersModule } from '@conf-match/shared/storybook-helpers';

const moduleMetadata = {
  declarations: [ActionButtonComponent],
  imports: [SharedUiIconsModule, SharedStorybookHelpersModule],
  providers: [ThemeService],
};

storiesOf('Shared/Action Button', module)
  .add('Do not match', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <button cm-action-button type="no-match"></button>
      </cm-theme>
    `,
  }))
  .add('Match', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <button cm-action-button type="match"></button>
      </cm-theme>
    `,
  }))
  .add('Back', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <button cm-action-button type="undo"></button>
      </cm-theme>
    `,
  }))
  .add('Info', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <button cm-action-button type="info"></button>
      </cm-theme>
    `,
  }))
  .add('Chat', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <button cm-action-button type="chat"></button>
      </cm-theme>
    `,
  }));
