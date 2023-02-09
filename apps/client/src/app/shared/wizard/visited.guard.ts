import { CanActivate, Router } from '@angular/router';
import { Injectable, InjectionToken, Inject } from '@angular/core';
import { WizardVisitedService } from './wizard-visited.service';

export const WIZARD_FALLBACK_ROUTE = new InjectionToken('WIZARD_FALLBACK_ROUTE');

@Injectable()
export class VisitedGuard implements CanActivate {
  constructor(
    private _visited: WizardVisitedService,
    private _router: Router,
    @Inject(WIZARD_FALLBACK_ROUTE) private _fallBackRoute: string
  ) {}

  canActivate(): boolean {
    const referrerRoute = this._router.url;
    const isVisited = this._visited.isVisited(referrerRoute);

    if (!isVisited) {
      this._router.navigate([this._fallBackRoute]);
    }
    return isVisited;
  }
}
