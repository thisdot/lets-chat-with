import { provideMockStore } from '@ngrx/store/testing';
import { BehaviorSubject, Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import {
  redirectToSignIn,
  userTermsAcceptAttempted,
  userTermsAcceptSucceeded,
  userVerifyEmailCompleted,
} from './amplify.actions';
import { AmplifyEffects } from './amplify.effects';
import { NotificationService } from '@conf-match/shared/ui-notifications';
import { UpdateUserGQL, User } from '@conf-match/api';
import { Actions } from '@ngrx/effects';
import { TestScheduler } from 'rxjs/testing';
import { UserCredentials } from '../models/user-credentials';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { userLoadedSuccess } from './core.actions';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('AmplifyEffects', () => {
  let actions$ = new Observable<Action>();
  let router: Router;
  let amplifyEffects: AmplifyEffects;
  const signUpFlowSubject = new BehaviorSubject<UserCredentials>(null);
  let testScheduler: TestScheduler;
  let updateUserGQL: UpdateUserGQL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), TranslocoTestingModule, ApolloTestingModule],
      providers: [
        AmplifyEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          initialState: {
            core: {
              appUser: {
                id: '1',
              },
            },
          },
        }),
        Location,
        { provide: NotificationService, useValue: {} },
      ],
    });

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.callFake(() => new Promise(() => {}));

    actions$ = TestBed.inject(Actions);
    amplifyEffects = TestBed.inject(AmplifyEffects);

    updateUserGQL = TestBed.inject(UpdateUserGQL);
  });

  describe('verifyEmailCompleted$', () => {
    it('should emit a sign up flow broken event when the needed data is missing', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        const action = userVerifyEmailCompleted();
        const completion = redirectToSignIn();
        signUpFlowSubject.next(null);

        actions$ = hot('--a', { a: action });

        expectObservable(amplifyEffects.verifyEmailCompleted$).toBe('--c', {
          c: completion,
        });
      });
    });
  });

  describe('checkTermsAfterLoadingUser$', () => {
    it('should navigate to terms page if user never accepted them', () => {
      testScheduler.run(({ hot }) => {
        const mockUser = { termsAccepted: false } as User;
        const action = userLoadedSuccess({ user: mockUser });

        actions$ = hot('-a', { a: action });

        amplifyEffects.checkTermsAfterLoadingUser$.subscribe();

        testScheduler.flush();

        expect(router.navigate).toHaveBeenCalledWith(['/signup', 'terms']);
      });
    });

    it("should shouldn't navigate to terms page if user accepted them", () => {
      testScheduler.run(({ hot }) => {
        const mockUser = { termsAccepted: true } as User;
        const action = userLoadedSuccess({ user: mockUser });

        actions$ = hot('-a', { a: action });

        amplifyEffects.checkTermsAfterLoadingUser$.subscribe();

        testScheduler.flush();

        expect(router.navigate).not.toHaveBeenCalledWith(['/signup', 'terms']);
      });
    });
  });

  describe('acceptTerms$', () => {
    it('it should redirect to /conferences after persisting termsAccepted', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: userTermsAcceptAttempted() });

        const response = cold('-b|', {
          b: {
            data: {
              updateUserGQL: {
                id: '1',
                termsAccepted: true,
              },
            },
          },
        });

        spyOn(updateUserGQL, 'mutate').and.returnValue(response as Observable<any>);

        expectObservable(amplifyEffects.acceptTerms$).toBe('--c', {
          c: userTermsAcceptSucceeded(),
        });

        amplifyEffects.acceptTerms$.subscribe();
        testScheduler.flush();
        expect(router.navigate).toHaveBeenCalledWith(['/conferences']);
      });
    });
  });
});
