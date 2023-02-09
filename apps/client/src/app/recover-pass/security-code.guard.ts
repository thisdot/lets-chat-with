import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class SecurityCodeGuard implements CanActivate {
  constructor(private _router: Router) {}

  canActivate(): boolean {
    const { state } = this._router.getCurrentNavigation().extras;
    const approved = state && state.dataObtained;

    if (!approved) {
      this._router.navigate(['recover-pass/email']);
    }

    return approved;
  }
}
