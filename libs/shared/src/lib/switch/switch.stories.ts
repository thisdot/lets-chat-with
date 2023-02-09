import { storiesOf } from '@storybook/angular';
import { ThemeService } from '@conf-match/shared/theme';
import { SwitchComponent } from './switch.component';
import { FormsModule } from '@angular/forms';
import { SharedStorybookHelpersModule } from '@conf-match/shared/storybook-helpers';

const moduleMetadata = {
  declarations: [SwitchComponent],
  providers: [ThemeService],
  imports: [SharedStorybookHelpersModule, FormsModule],
};

storiesOf('Shared/Switch', module)
  .add('Default (Off)', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <cm-switch></cm-switch>
      </cm-theme>
    `,
  }))
  .add('On', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <cm-switch [ngModel]="true"></cm-switch>
      </cm-theme>
    `,
  }))
  .add('Disabled', () => ({
    moduleMetadata,
    template: `
      <cm-theme>
        <cm-switch [ngModel]="false" [disabled]="true"></cm-switch>
      </cm-theme>
    `,
  }));
