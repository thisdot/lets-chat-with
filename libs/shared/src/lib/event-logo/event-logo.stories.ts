import { storiesOf } from '@storybook/angular';
import { ThemeService } from '@conf-match/shared/theme';
import { EventLogoComponent } from './event-logo.component';
import { SharedStorybookHelpersModule } from '@conf-match/shared/storybook-helpers';

const moduleMetadata = {
  declarations: [EventLogoComponent],
  imports: [SharedStorybookHelpersModule],
  providers: [ThemeService],
};

storiesOf('Shared/EventLogo', module).add('Default', () => ({
  moduleMetadata,
  template: `
      <cm-theme>
        <cm-event-logo [event]="{ name: '', logoUrl: '' }"></cm-event-logo>
      </cm-theme>
    `,
  styles: [
    `
      :host {
        background-color: lightblue;
        display: block;
      }
    `,
  ],
}));
