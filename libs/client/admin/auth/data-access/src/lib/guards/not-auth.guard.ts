import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { take, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthSelectors } from '../store';

@Injectable({ providedIn: 'root' })
export class NotAuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store) {}
  canActivate(): Observable<boolean | UrlTree> {
    return this.store.pipe(
      select(AuthSelectors.selectUser),
      take(1),
      map((user) => (!user ? true : this.router.parseUrl('/reports')))
    );
  }
}
