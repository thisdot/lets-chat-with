import { Component } from '@angular/core';

@Component({
  selector: 'cm-settings-wrapper',
  templateUrl: './settings-wrapper.component.html',
  styleUrls: ['./settings-wrapper.component.scss'],
})
export class SettingsWrapperComponent {
  constructor() {}

  onBack() {
    window.history.back();
  }
}
