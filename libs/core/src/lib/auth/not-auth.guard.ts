import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectUser, selectConferenceId } from './../state/core.selectors';
import { take, map, withLatestFrom, filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CoreUser } from '../models/user';

const DEFAULT_ROUTE = '/connect';

@Injectable({ providedIn: 'root' })
export class NotAuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<{}>) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.store.pipe(
      select(selectUser),
      take(1),
      withLatestFrom(this.store.pipe(select(selectConferenceId))),
      map<[CoreUser | null, string | null], [CoreUser | null, string]>(([user, conferenceId]) => {
        if (conferenceId) {
          return [user, `/conferences/${conferenceId}/${DEFAULT_ROUTE}`];
        } else {
          return [user, `/conferences`];
        }
      }),
      map(([user, url]: [CoreUser | null, string]) => (!user ? true : this.router.parseUrl(url)))
    );
  }
}
