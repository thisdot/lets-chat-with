import { storiesOf } from '@storybook/angular';
import { ThemeService } from '@conf-match/shared/theme';
import { ExpandableComponent } from './expandable.component';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { Component } from '@angular/core';
import { SharedStorybookHelpersModule } from '@conf-match/shared/storybook-helpers';

@Component({
  selector: 'cm-expandable-test',
  template: `
    <cm-expandable [visible]="visible" (toggle)="onToggle($event)">
      <h2 header>Expandable Header</h2>
      <p content>Content</p>
    </cm-expandable>
  `,
  styles: [
    `
      :host {
        width: 400px;
        display: block;
      }
    `,
  ],
})
class ExpandableTestComponent {
  visible: boolean;

  onToggle(visible: boolean) {
    this.visible = visible;
  }
}

const moduleMetadata = {
  declarations: [ExpandableComponent, ExpandableTestComponent],
  imports: [SharedStorybookHelpersModule, SharedUiIconsModule],
  providers: [ThemeService],
};

storiesOf('Shared/ExpandableComponent', module).add('Primary (default)', () => ({
  moduleMetadata,
  template: `
      <cm-theme>
        <cm-expandable-test></cm-expandable-test>
      </cm-theme>
    `,
}));
