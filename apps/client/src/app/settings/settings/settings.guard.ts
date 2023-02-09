import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CmBreakpoints } from '@conf-match/shared';
import { SettingsPreviousLocationService } from './settings-previous-location.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsGuard implements CanActivate {
  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private previousLocationService: SettingsPreviousLocationService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.breakpointObserver.isMatched(CmBreakpoints.MD.UP)) {
      return this.router.parseUrl('/settings/password');
    } else {
      const previousLocation = window.location.pathname;
      if (!previousLocation.startsWith('/settings')) {
        this.previousLocationService.setPreviousLocation(window.location.pathname);
      }
      return true;
    }
  }
}
