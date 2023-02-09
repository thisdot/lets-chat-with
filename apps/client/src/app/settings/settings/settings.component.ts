import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsPreviousLocationService } from './settings-previous-location.service';

@Component({
  selector: 'cm-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  constructor(
    private router: Router,
    private previousLocationService: SettingsPreviousLocationService
  ) {}

  onBack(): void {
    const loc = this.previousLocationService.getPreviousLocation();
    this.router.navigateByUrl(loc);
  }
}
