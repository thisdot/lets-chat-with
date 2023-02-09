import {
  CanActivate,
  UrlTree,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';

import { take, map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthGuardActions } from '../store/actions';
import { ClientAdminAuthDataAccessModule } from '../client-admin-auth-data-access.module';
import { AuthService } from '@conf-match/core';

@Injectable({ providedIn: ClientAdminAuthDataAccessModule })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authService.getUnfilteredCurrentUser().pipe(
      take(1),
      map((user) => {
        if (!user) {
          this.store.dispatch(AuthGuardActions.authGuardRedirect({ url: state.url }));
          return this.router.parseUrl('/signin');
        }

        return true;
      }),
      catchError(() => of(this.router.parseUrl('/signin')))
    );
  }
}
