import { Observable, EMPTY, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { SettingsEffects } from './settings.effects';
import { provideMockActions } from '@ngrx/effects/testing';

import { TestScheduler } from 'rxjs/testing';
import { NotificationService } from '@conf-match/shared/ui-notifications';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  passwordChanged,
  passwordChangedSuccess,
  passwordChangedFailed,
  emailChanged,
  emailChangedSuccess,
  emailChangedFailed,
} from './settings.actions';
import { AuthService } from './auth.service';

describe('SettingsEffects', () => {
  const notificationService = jasmine.createSpyObj('notificationService', ['createNotification$']);

  const authService = jasmine.createSpyObj('authService', ['changePassword', 'changeEmail']);
  let effects: SettingsEffects;
  let actions: Observable<any>;
  let router: Router;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        SettingsEffects,
        provideMockActions(() => actions),
        { provide: NotificationService, useValue: notificationService },
        { provide: AuthService, useValue: authService },
      ],
    });

    effects = TestBed.inject(SettingsEffects);
    router = TestBed.inject(Router);

    spyOn(router, 'navigate').and.callFake(() => new Promise(() => {}));
    notificationService.createNotification$.and.returnValue(
      of({
        closed: EMPTY,
        close: jasmine.createSpy(),
      })
    );

    // More info: https://rxjs.dev/guide/testing/marble-testing#api
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('passwordChanged$', () => {
    it('should dispatch passwordChangedSuccess on success', () => {
      const action = passwordChanged({
        oldPassword: 'old',
        newPassword: 'new',
      });
      const outcome = passwordChangedSuccess();

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: action });

        const response = cold('-b|', { b: 'a' });
        authService.changePassword.and.returnValue(response);

        expectObservable(effects.passwordChanged$).toBe('--b', { b: outcome });
      });
    });

    it('should dispatch passwordChangedFailed on failure', () => {
      const error = 'error';
      const action = passwordChanged({
        oldPassword: 'old',
        newPassword: 'new',
      });
      const outcome = passwordChangedFailed({ error });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: action });

        const response = cold('-#', { b: 'a' });
        authService.changePassword.and.returnValue(response);

        expectObservable(effects.passwordChanged$).toBe('--b', { b: outcome });
      });
    });
  });

  describe('passwordChangedSuccess$', () => {
    it('should redirect on success', () => {
      const action = passwordChangedSuccess();

      testScheduler.run(({ hot }) => {
        actions = hot('a', { a: action });

        effects.passwordChangedSuccess$.subscribe();

        testScheduler.flush();

        expect(router.navigate).toHaveBeenCalledWith(['settings']);
      });
    });

    it('should show notification on success', () => {
      const action = passwordChangedSuccess();

      testScheduler.run(({ hot }) => {
        actions = hot('a', { a: action });

        effects.passwordChangedSuccess$.subscribe();

        testScheduler.flush();

        expect(notificationService.createNotification$).toHaveBeenCalled();
      });
    });
  });

  describe('passwordChangedFailed$', () => {
    it('should show notification on failure', () => {
      const action = passwordChangedFailed({ error: 'error' });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('a', { a: action });

        const response = cold('#', { b: 'a' });
        authService.changePassword.and.returnValue(response);

        effects.passwordChangedFailed$.subscribe();

        testScheduler.flush();

        expect(notificationService.createNotification$).toHaveBeenCalled();
      });
    });
  });

  describe('emailChanged$', () => {
    it('should dispatch emailChangedSuccess on success', () => {
      const action = emailChanged({
        email: 'new',
      });
      const outcome = emailChangedSuccess();

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: action });

        const response = cold('-b|', { b: 'a' });
        authService.changeEmail.and.returnValue(response);

        expectObservable(effects.emailChanged$).toBe('--b', { b: outcome });
      });
    });

    it('should dispatch emailChangedFailed on failure', () => {
      const error = 'error';
      const action = emailChanged({
        email: 'new',
      });
      const outcome = emailChangedFailed({ error });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: action });

        const response = cold('-#', { b: 'a' });
        authService.changeEmail.and.returnValue(response);

        expectObservable(effects.emailChanged$).toBe('--b', { b: outcome });
      });
    });
  });

  describe('emailChangedSuccess$', () => {
    it('should show notification on success', () => {
      const action = emailChangedSuccess();

      testScheduler.run(({ hot }) => {
        actions = hot('a', { a: action });

        effects.emailChangedSuccess$.subscribe();

        testScheduler.flush();

        expect(notificationService.createNotification$).toHaveBeenCalled();
      });
    });
  });

  describe('emailChangedFailed$', () => {
    it('should show notification on failure', () => {
      const action = emailChangedFailed({ error: 'error' });

      testScheduler.run(({ hot }) => {
        actions = hot('a', { a: action });

        effects.emailChangedFailed$.subscribe();

        testScheduler.flush();

        expect(notificationService.createNotification$).toHaveBeenCalled();
      });
    });
  });
});
