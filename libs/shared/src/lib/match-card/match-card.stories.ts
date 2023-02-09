import { storiesOf } from '@storybook/angular';
import { ThemeService } from '@conf-match/shared/theme';
import { ActionButtonComponent } from '../action-button/action-button.component';
import { MatchCardComponent } from './match-card.component';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { SharedStorybookHelpersModule } from '@conf-match/shared/storybook-helpers';
import { AvatarImageComponent } from '../avatar-image/avatar-image.component';

const moduleMetadata = {
  declarations: [MatchCardComponent, ActionButtonComponent, AvatarImageComponent],
  imports: [SharedStorybookHelpersModule, SharedUiIconsModule],
  providers: [ThemeService],
};

storiesOf('Shared/Match Card', module).add('Default', () => ({
  moduleMetadata,
  template: `
  <cm-theme>
    <cm-match-card
      [match]="match">
    </cm-match-card>
  </cm-theme>
`,
  props: {
    match: {
      id: 'match',
      attendee: {
        fullName: 'Shane Williamson',
        bio: 'CTO, Sonic',
        // avatarUrl: 'https://randomuser.me/api/portraits/women/23.jpg',
      },
    },
  },
}));
