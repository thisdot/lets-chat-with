import { Injectable, RendererFactory2, Renderer2 } from '@angular/core';
import { createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { WindowRef } from '@conf-match/shared';
import { NotificationService, NotificationType } from '@conf-match/shared/ui-notifications';

import { map, switchMap, mapTo, takeUntil, filter } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';
import { Observable, merge } from 'rxjs';
import { userOnline, userOffline, appStateEffectsInitialized } from './app-state.actions';
import { Store } from '@ngrx/store';

const OnlineNotificationTtl = 5000;

@Injectable()
export class AppStateEffects implements OnInitEffects {
  private _renderer: Renderer2;

  public online$ = createEffect(() =>
    this._actions$.pipe(
      ofType(appStateEffectsInitialized),
      switchMap(() =>
        this._listenOnline().pipe(map((isOnline) => (isOnline ? userOnline() : userOffline())))
      )
    )
  );

  public init$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(appStateEffectsInitialized),
      filter(() => !this._window.ref.navigator.onLine),
      map(() => userOffline())
    );
  });

  public userOnline$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(userOnline),
        switchMap(() =>
          this._showOnlineNotification().pipe(takeUntil(this._actions$.pipe(ofType(userOffline))))
        )
      );
    },
    { dispatch: false }
  );

  public userOffline$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(userOffline),
        switchMap(() =>
          this._showOfflineNotification().pipe(takeUntil(this._actions$.pipe(ofType(userOnline))))
        )
      );
    },
    { dispatch: false }
  );

  constructor(
    private _actions$: Actions,
    private _notifications: NotificationService,
    private _store: Store<{}>,
    private _window: WindowRef,
    rendererFactory: RendererFactory2
  ) {
    this._renderer = rendererFactory.createRenderer(null, null);
  }

  ngrxOnInitEffects() {
    return appStateEffectsInitialized();
  }

  private _listenOnline() {
    return merge(
      this._listen('online').pipe(mapTo(true)),
      this._listen('offline').pipe(mapTo(false))
    );
  }

  private _listen(event: string) {
    return new Observable((observer) => {
      return this._renderer.listen(this._window.ref, event, () => observer.next());
    });
  }

  private _showOfflineNotification() {
    return this._notifications.createNotification$(
      {
        type: NotificationType.Unavailable,
        title: 'You are offline',
        message: `We can't reach our servers. Please, check your connection`,
        closeable: false,
        ttl: 0,
      },
      true
    );
  }

  private _showOnlineNotification() {
    return this._notifications.createNotification$({
      type: NotificationType.Success,
      title: 'You are back online!',
      ttl: OnlineNotificationTtl,
    });
  }
}
