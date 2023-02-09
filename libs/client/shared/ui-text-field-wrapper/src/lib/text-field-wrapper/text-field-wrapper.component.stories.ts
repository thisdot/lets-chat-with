import { storiesOf } from '@storybook/angular';
import { ThemeService } from '@conf-match/shared/theme';
import { TextFieldWrapperComponent } from './text-field-wrapper.component';
import { SharedStorybookHelpersModule } from '@conf-match/shared/storybook-helpers';

const moduleMetadata = {
  declarations: [TextFieldWrapperComponent],
  imports: [SharedStorybookHelpersModule],
  providers: [ThemeService],
};

storiesOf('Shared/TextFieldWrapper', module)
  .add('Default', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <cm-text-field-wrapper>
          <input class="cm-input" />
        </cm-text-field-wrapper>
      </cm-theme>
    `,
  }))
  .add('With label', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <cm-text-field-wrapper [label]="'Label'" [name]="'text'">
          <input class="cm-input" />
        </cm-text-field-wrapper>
      </cm-theme>
    `,
  }))
  .add('With errors', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <cm-text-field-wrapper [errors]="['first', 'second']">
          <input class="cm-input ng-invalid" />
        </cm-text-field-wrapper>
      </cm-theme>
    `,
  }))
  .add('With info', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <cm-text-field-wrapper [info]="'Additional info'">
          <input class="cm-input" />
        </cm-text-field-wrapper>
      </cm-theme>
    `,
  }));
