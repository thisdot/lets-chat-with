import { storiesOf } from '@storybook/angular';

import { PhotoPickerComponent } from './photo-picker.component';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { ThemeService } from '@conf-match/shared/theme';
import { SharedStorybookHelpersModule } from '@conf-match/shared/storybook-helpers';

const moduleMetadata = {
  declarations: [PhotoPickerComponent],
  imports: [SharedStorybookHelpersModule, SharedUiIconsModule],
  providers: [ThemeService],
};

storiesOf('Shared/PhotoPicker', module).add('Default', () => ({
  moduleMetadata,
  template: `
      <cm-theme>
        <cm-photo-picker></cm-photo-picker>
      </cm-theme>
    `,
}));
