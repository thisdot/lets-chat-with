import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../state/core.selectors';

@Injectable({ providedIn: 'root' })
export class AuthNonVerifiedGuard implements CanActivate {
  constructor(private router: Router, private store: Store<{}>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.store.select(selectUser).pipe(
      take(1),
      map((user) => {
        if (user?.emailVerified && state.url !== '/signup/terms') {
          return this.router.parseUrl('/conferences');
        }
        return true;
      })
    );
  }
}
