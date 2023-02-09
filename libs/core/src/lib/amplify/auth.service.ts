import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Auth } from '@aws-amplify/auth';
import { CoreUser } from '../models/user';
import { AmplifyCognitoUser } from '../models/amplify';
import { filter, map, switchMap } from 'rxjs/operators';
import { TranslocoService } from '@ngneat/transloco';

export const ADMIN_GROUP = 'ADMINS';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private transloco: TranslocoService) {}

  signIn(email: string, password: string): Observable<CoreUser> {
    return from(Auth.signIn(email, password)).pipe(switchMap(() => this.getCurrentUser()));
  }

  signInAdmin(email: string, password: string): Observable<CoreUser> {
    return from(Auth.signIn(email, password)).pipe(
      switchMap(() => {
        return this.isAdmin().pipe(
          switchMap((isAdmin) => {
            if (isAdmin) {
              return this.getCurrentUser();
            }
            throw new Error(this.transloco.translate('userAuth.errors.notAdmin'));
          })
        );
      })
    );
  }

  signUp(email: string, password: string): Observable<void> {
    return from(Auth.signUp({ username: email, password: password })).pipe(map(() => undefined));
  }

  signOut(): Observable<void> {
    return from(Auth.signOut()).pipe(map(() => undefined));
  }

  isAdmin(): Observable<boolean> {
    return from(Auth.currentAuthenticatedUser()).pipe(
      map((user) =>
        user?.signInUserSession?.accessToken?.payload?.['cognito:groups']?.includes(ADMIN_GROUP)
      )
    );
  }

  getCurrentUser(): Observable<CoreUser> {
    return from(Auth.currentUserInfo()).pipe(
      filter((user) => !!user),
      map((user) => this.cognitoToCoreUser(user))
    );
  }

  getUnfilteredCurrentUser(): Observable<CoreUser | null> {
    return from(Auth.currentUserInfo()).pipe(map((user) => user && this.cognitoToCoreUser(user)));
  }

  cognitoToCoreUser(cognitoUser: AmplifyCognitoUser): CoreUser {
    return {
      cognitoId: cognitoUser.username,
      emailVerified: cognitoUser.attributes.email_verified,
    };
  }
}
