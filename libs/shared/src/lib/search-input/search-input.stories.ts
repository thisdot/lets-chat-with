import { storiesOf } from '@storybook/angular';
import { ThemeService } from '@conf-match/shared/theme';
import { SearchInputComponent } from './search-input.component';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { Component } from '@angular/core';
import { InputDirective } from '@conf-match/client/shared/ui-input';
import { SharedStorybookHelpersModule } from '@conf-match/shared/storybook-helpers';

@Component({
  selector: 'cm-search-input-test',
  template: `
    <cm-search-input (search)="onSearch($event)"></cm-search-input>
    <p>Search string: {{ searchString }}</p>
  `,
})
class SearchInputTestComponent {
  searchString: string;

  onSearch(searchString: string) {
    this.searchString = searchString;
  }
}

const moduleMetadata = {
  declarations: [InputDirective, SearchInputComponent, SearchInputTestComponent],
  imports: [SharedStorybookHelpersModule, SharedUiIconsModule],
  providers: [ThemeService],
};

storiesOf('Shared/SearchInput', module).add('Primary (default)', () => ({
  moduleMetadata,
  template: `
      <cm-theme>
        <cm-search-input-test>
        </cm-search-input-test>
      </cm-theme>
    `,
}));
