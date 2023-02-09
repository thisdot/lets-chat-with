import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { catchError, exhaustMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngrx/store';

import { NotificationService, NotificationType } from '@conf-match/shared/ui-notifications';
import { GetUserByOwnerGQL, UpdateUserGQL } from '@conf-match/api';
import { AuthService } from '@conf-match/core';

import { AuthAPIActions, SignInActions, SignOutActions } from '../actions';
import { AuthSelectors } from '../selectors';

const NotificationTtl = 3000;

@Injectable()
export class AuthEffects implements OnInitEffects {
  public checkLoginStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAPIActions.authEffectsInitialized),
      map(() => {
        const userString = localStorage.getItem('user');
        return userString ? JSON.parse(userString) : null;
      }),
      map((user) => {
        if (user) {
          return AuthAPIActions.userLoginSuccess({ user });
        } else {
          return AuthAPIActions.userLogoutSuccess({ route: ['/signin'] });
        }
      })
    )
  );

  public signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SignInActions.userSignInAttempted),
      withLatestFrom(this.store.select(AuthSelectors.selectRedirectUrl)),
      exhaustMap(([{ email, password }, redirectUrl]) =>
        this.authService.signInAdmin(email, password).pipe(
          map((user) => AuthAPIActions.userLoginSuccess({ user })),
          tap(() => void this.router.navigateByUrl(redirectUrl || '/reports')),
          catchError((error) =>
            of(
              AuthAPIActions.userSignInFailed({
                errors: [error.message],
                email,
              })
            )
          )
        )
      )
    )
  );

  public setAuthUser$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthAPIActions.userLoginSuccess, AuthAPIActions.checkLoginStatusSuccess),
        switchMap((action) => {
          return of(null).pipe(
            tap(() => void localStorage.setItem('user', JSON.stringify(action.user))),
            catchError(() => EMPTY)
          );
        })
      );
    },
    { dispatch: false }
  );

  public showAuthErrorNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthAPIActions.userSignInFailed),
        switchMap(({ errors }) => this.showAuthErrorNotification(errors))
      ),
    { dispatch: false }
  );

  public loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAPIActions.userLoginSuccess, AuthAPIActions.checkLoginStatusSuccess),
      switchMap(({ user }) =>
        this.getUserByOwner.fetch({ owner: user.cognitoId }, { fetchPolicy: 'network-only' }).pipe(
          tap(({ data }) => {
            if (!data.getUserByOwner.items.length) {
              throw Error(`Cannot find user by owner (${user.cognitoId})`);
            }
          }),
          map(({ data }) =>
            AuthAPIActions.userLoadedSuccess({
              user: data.getUserByOwner.items[0],
            })
          ),
          catchError((e) => {
            console.error(e);
            return of(AuthAPIActions.userLoadedFailed());
          })
        )
      )
    )
  );

  public signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SignOutActions.userSignOutAttempted),
      switchMap(({ route, extras }) =>
        this.authService
          .signOut()
          .pipe(map(() => AuthAPIActions.userLogoutSuccess({ route, extras })))
      )
    )
  );

  public clearAuthUser$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthAPIActions.userLogoutSuccess, AuthAPIActions.checkLoginStatusFailed),
        tap(() => void localStorage.removeItem('user'))
      );
    },
    { dispatch: false }
  );

  public logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthAPIActions.userLogoutSuccess),
        tap(({ route, extras }) => {
          // TODO: Decide where that key will be kept
          localStorage.removeItem('cm-onboarding-completed');
          this.router.navigate(route, extras);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private notifications: NotificationService,
    private getUserByOwner: GetUserByOwnerGQL,
    private updateUser: UpdateUserGQL,
    private authService: AuthService,
    private translate: TranslocoService,
    private store: Store
  ) {}

  ngrxOnInitEffects() {
    return AuthAPIActions.authEffectsInitialized();
  }

  private showAuthErrorNotification(errors: string[]) {
    return this.notifications.createNotification$(
      {
        type: NotificationType.Unavailable,
        title: this.translate.translate('userAuth.toaster.error.title'),
        message: errors.join('\n'),
        closeable: true,
        ttl: NotificationTtl,
      },
      false
    );
  }
}
