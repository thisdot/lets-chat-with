import { storiesOf } from '@storybook/angular';
import { ThemeService } from '@conf-match/shared/theme';
import { ActionButtonComponent } from '../action-button/action-button.component';
import { ConnectCardComponent } from './connect-card.component';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { ChipComponent } from '../chip/chip.component';
import { SharedStorybookHelpersModule } from '@conf-match/shared/storybook-helpers';

const moduleMetadata = {
  declarations: [ConnectCardComponent, ActionButtonComponent, ChipComponent],
  imports: [SharedStorybookHelpersModule, SharedUiIconsModule],
  providers: [ThemeService],
};

storiesOf('Shared/Connect Card', module).add('Default', () => ({
  moduleMetadata,
  template: `
  <cm-theme>
    <cm-connect-card [attendee]="attendee"></cm-connect-card>
  </cm-theme>
`,
  props: {
    attendee: {
      name: 'Shane Williamson',
      description: 'CTO, Sonic',
      summary: `
        I'm an investor and JS contributor. I have 20+ years of experience.
        Open to new ideas and would like to discuss it with a pro project architect.
      `,
      avatarUrl: 'https://randomuser.me/api/portraits/women/23.jpg',
      lookingFor: ['Tag one', 'Tag two', 'Tag three'],
      interests: ['Tag one', 'Tag two', 'Tag three', 'Tag one', 'Tag two', 'Tag three'],
    },
  },
}));
