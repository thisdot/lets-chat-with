import {
  CanActivate,
  UrlTree,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { authGuardRedirect } from '../state/amplify.actions';
import { take, map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthService } from '../amplify/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<{}>, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authService.getUnfilteredCurrentUser().pipe(
      take(1),
      map((user) => {
        if (!user) {
          this.store.dispatch(authGuardRedirect({ url: state.url }));
          return this.router.parseUrl('/signin');
        }
        if (user && !user.emailVerified) {
          return this.router.parseUrl('/signup/verify');
        }
        return true;
      }),
      catchError(() => of(this.router.parseUrl('/signin')))
    );
  }
}
