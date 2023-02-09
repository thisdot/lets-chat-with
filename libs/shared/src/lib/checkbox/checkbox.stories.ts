import { storiesOf } from '@storybook/angular';
import { CheckboxComponent } from './checkbox.component';
import { ThemeService } from '@conf-match/shared/theme';
import { SharedStorybookHelpersModule } from '@conf-match/shared/storybook-helpers';

const moduleMetadata = {
  declarations: [CheckboxComponent],
  imports: [SharedStorybookHelpersModule],
  providers: [ThemeService],
};

storiesOf('Shared/Checkbox', module)
  .add('unchecked', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <cm-checkbox></cm-checkbox>
      </cm-theme>
    `,
  }))
  .add('checked', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <cm-checkbox [value]="true"></cm-checkbox>
      </cm-theme>
    `,
  }))
  .add('disabled', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <cm-checkbox [disabled]="true"></cm-checkbox>
      </cm-theme>
    `,
  }))
  .add('disabled and checked', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <cm-checkbox [disabled]="true" [value]="true"></cm-checkbox>
      </cm-theme>
    `,
  }))
  .add('unchecked with label', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <cm-checkbox [label]="'Remember me'"></cm-checkbox>
      </cm-theme>
    `,
  }))
  .add('checked with label', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <cm-checkbox [value]="true" [label]="'Remember me'"></cm-checkbox>
      </cm-theme>
    `,
  }))
  .add('disabled and unchecked with label', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <cm-checkbox [disabled]="true" [label]="'Remember me'"></cm-checkbox>
      </cm-theme>
    `,
  }))
  .add('disabled and checked with label', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <cm-checkbox [value]="true" [disabled]="true" [label]="'Remember me'"></cm-checkbox>
      </cm-theme>
    `,
  }))
  .add('multiple checkboxes with and without label', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <cm-checkbox [value]="true"></cm-checkbox>
        <cm-checkbox [value]="true" [label]="'Remember me'"></cm-checkbox>
      </cm-theme>
    `,
  }))
  .add('unchecked with hidden label (aria-label)', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <cm-checkbox [label]="'Remember me'" [showLabel]="false"></cm-checkbox>
      </cm-theme>
    `,
  }))
  .add('checked with hidden label (aria-label)', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <cm-checkbox [value]="true" [label]="'Remember me'" [showLabel]="false"></cm-checkbox>
      </cm-theme>
    `,
  }));
