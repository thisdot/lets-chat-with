import { storiesOf } from '@storybook/angular';
import { ThemeService } from '@conf-match/shared/theme';
import { TermsItemComponent } from './terms-item.component';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { SharedStorybookHelpersModule } from '@conf-match/shared/storybook-helpers';

const moduleMetadata = {
  declarations: [TermsItemComponent],
  imports: [SharedStorybookHelpersModule, SharedUiIconsModule],
  providers: [ThemeService],
};

storiesOf('Shared/Terms Item', module)
  .add('Default', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <cm-terms-item title="I will have empathy" text="We all express ourselfs differently. Do not judge." icon="Flash"></cm-terms-item>
      </cm-theme>
    `,
  }))
  .add('without Icon', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <cm-terms-item title="I will have empathy" text="We all express ourselfs differently. Do not judge."></cm-terms-item>
      </cm-theme>
    `,
  }));
