import { storiesOf } from '@storybook/angular';
import { ThemeService } from '@conf-match/shared/theme';
import { SharedStorybookHelpersModule } from '@conf-match/shared/storybook-helpers';
import { MessageThreadListItemComponent } from './message-thread-list-item.component';

const moduleMetadata = {
  declarations: [MessageThreadListItemComponent],
  imports: [SharedStorybookHelpersModule],
  providers: [ThemeService],
};

storiesOf('Shared/Message', module).add('Default', () => ({
  moduleMetadata,
  template: `
  <cm-theme>
    <cm-message-thread-list-item [messageThread]="messageThread"></cm-message-thread-list-item>
  </cm-theme>
`,
  props: {
    messageThread: {
      lastMessage: 'Hello there!',
      user: {
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
  },
}));
