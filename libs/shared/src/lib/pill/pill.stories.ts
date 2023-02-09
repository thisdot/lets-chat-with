import { storiesOf } from '@storybook/angular';
import { ThemeService } from '@conf-match/shared/theme';
import { PillComponent } from './pill.component';
import { SharedStorybookHelpersModule } from '@conf-match/shared/storybook-helpers';

const moduleMetadata = {
  declarations: [PillComponent],
  imports: [SharedStorybookHelpersModule],
  providers: [ThemeService],
};

storiesOf('Shared/Pill', module)
  .add('Primary (default)', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <cm-pill [(ngModel)]="model" [trueValue]="trueValue" >Checkbox Pill</cm-pill>
      </cm-theme>
      <br/>
      Assigned true value: {{trueValue}} <br/>
      Current ngModel value: {{model}}
    `,
    props: {
      model: '',
      trueValue: 'Javascript',
    },
  }))
  .add('Primary - pre-selected', () => ({
    moduleMetadata,
    template: `
    <cm-theme>
      <cm-pill [(ngModel)]="model" [trueValue]="trueValue" >Checkbox Pill</cm-pill>
    </cm-theme>
    `,
    props: {
      model: 'Javascript',
      trueValue: 'Javascript',
    },
  }))
  .add('Secondary', () => ({
    moduleMetadata,
    template: `
    <cm-theme>
      <cm-pill [(ngModel)]="model" [type]="'secondary'">Checkbox Pill</cm-pill>
    </cm-theme>
    `,
    props: {
      model: 'Javascript',
      trueValue: 'Javascript',
    },
  }))
  .add('Multiple - keyboard navigation', () => ({
    moduleMetadata,
    template: `
    <cm-theme>
      <cm-pill role="button" tabindex="0" [(ngModel)]="model1" [trueValue]="trueValue1" >Pill1</cm-pill>
      <cm-pill role="button" tabindex="0" [(ngModel)]="model2" [trueValue]="trueValue2" >Pill2</cm-pill>
    </cm-theme>
    `,
    props: {
      model1: 'Javascript',
      trueValue1: 'Javascript',
      model2: 'Javascript',
      trueValue2: 'Javascript',
    },
  }));
