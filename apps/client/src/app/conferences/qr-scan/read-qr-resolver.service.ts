import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import {
  conferenceJoinAttempted,
  conferenceJoinAttemptFailure,
  conferenceJoinAttemptNotExist,
} from '@conf-match/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReadQrResolverService implements Resolve<string> {
  constructor(private store: Store<any>, private actions$: Actions, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> {
    const domain = route.queryParamMap.get('domain');

    this.actions$
      .pipe(
        ofType(conferenceJoinAttemptFailure, conferenceJoinAttemptNotExist),
        take(1),
        tap(() => void this.router.navigate(['conferences']))
      )
      .subscribe();

    this.store.dispatch(conferenceJoinAttempted({ letsChatWithUrl: domain }));
    return of(domain);
  }
}
