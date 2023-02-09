import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsPreviousLocationService {
  private previousLocation = '/';

  getPreviousLocation(): string {
    return this.previousLocation;
  }

  setPreviousLocation(location: string): void {
    this.previousLocation = location;
  }
}
