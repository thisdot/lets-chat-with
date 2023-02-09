import { storiesOf } from '@storybook/angular';
import { ThemeService } from '@conf-match/shared/theme';
import {
  InputAppendWrapperComponent,
  InputSuffixDirective,
  InputPrefixDirective,
} from './input-append-wrapper.component';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';

import { SharedStorybookHelpersModule } from '@conf-match/shared/storybook-helpers';
import { InputDirective } from '@conf-match/client/shared/ui-input';

const moduleMetadata = {
  declarations: [
    InputAppendWrapperComponent,
    InputDirective,
    InputPrefixDirective,
    InputSuffixDirective,
  ],
  imports: [SharedStorybookHelpersModule, SharedUiIconsModule],
  providers: [ThemeService],
};

storiesOf('Shared/Input Append', module)
  .add('Prefix', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <cm-input-append-wrapper>
          <cm-icon cmInputPrefix name="Search" size="xl"></cm-icon>
          <input cmInput />
        </cm-input-append-wrapper>
      </cm-theme>
    `,
  }))
  .add('Suffix', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <cm-input-append-wrapper>
          <input cmInput />
          <cm-icon cmInputSuffix name="Send" size="xl"></cm-icon>
        </cm-input-append-wrapper>
      </cm-theme>
    `,
  }));
