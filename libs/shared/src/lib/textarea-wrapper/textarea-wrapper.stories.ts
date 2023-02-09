import { storiesOf } from '@storybook/angular';
import { ThemeService } from '@conf-match/shared/theme';
import { TextareaWrapperComponent } from './textarea-wrapper.component';
import { CounterComponent } from '../counter/counter.component';
import { TextareaDirective } from '../textarea/textarea.directive';
import { SharedStorybookHelpersModule } from '@conf-match/shared/storybook-helpers';

const moduleMetadata = {
  declarations: [TextareaWrapperComponent, CounterComponent, TextareaDirective],
  imports: [SharedStorybookHelpersModule],
  providers: [ThemeService],
};

storiesOf('Shared/TextareaWrapper', module).add('Default', () => ({
  moduleMetadata,
  template: `
      <cm-theme>
        <cm-textarea-wrapper>
          <textarea cmTextarea maxlength="20"></textarea>
        </cm-textarea-wrapper>
      </cm-theme>
    `,
}));
