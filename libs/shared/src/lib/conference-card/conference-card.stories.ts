import { storiesOf } from '@storybook/angular';
import { ThemeService } from '@conf-match/shared/theme';
import { ConferenceCardComponent } from './conference-card.component';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { SharedStorybookHelpersModule } from '@conf-match/shared/storybook-helpers';

const moduleMetadata = {
  declarations: [ConferenceCardComponent],
  imports: [SharedStorybookHelpersModule, SharedUiIconsModule],
  providers: [ThemeService],
};

storiesOf('Shared/Conference Card', module)
  .add('Default', () => ({
    moduleMetadata,
    template: `
  <cm-theme>
    <cm-conference-card title="Conference one" subTitle="Over Dec 12, 2019" matches="2" chats="1"></cm-conference-card>
  </cm-theme>
`,
  }))
  .add('Active', () => ({
    moduleMetadata,
    template: `
  <cm-theme>
    <cm-conference-card title="Conference one" subTitle="Over Dec 12, 2019" matches="2" chats="2" [active]="true"></cm-conference-card>
  </cm-theme>
`,
  }));
