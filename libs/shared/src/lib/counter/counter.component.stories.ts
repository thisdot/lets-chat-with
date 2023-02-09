import { storiesOf } from '@storybook/angular';
import { ThemeService } from '@conf-match/shared/theme';
import { CounterComponent } from './counter.component';
import { SharedStorybookHelpersModule } from '@conf-match/shared/storybook-helpers';

const moduleMetadata = {
  declarations: [CounterComponent],
  imports: [SharedStorybookHelpersModule],
  providers: [ThemeService],
};

storiesOf('Shared/Counter', module)
  .add('Default', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <cm-counter [count]="5" [total]="7"></cm-counter>
      </cm-theme>
    `,
  }))
  .add('Zero Reached', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <cm-counter [count]="0" [total]="7"></cm-counter>
      </cm-theme>
    `,
  }))
  .add('No background', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <cm-counter [count]="5" [total]="7" [background]="false"></cm-counter>
      </cm-theme>
    `,
  }));
