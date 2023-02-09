import { Component, Output, EventEmitter, HostBinding } from '@angular/core';

@Component({
  selector: 'cm-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent {
  @Output() search = new EventEmitter<string>();

  @HostBinding('class.cm-search-input')
  get defaultClass() {
    return true;
  }

  onSearchInput(str: string) {
    this.search.emit(str);
  }
}
