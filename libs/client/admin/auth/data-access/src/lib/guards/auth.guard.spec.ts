/* eslint-disable @typescript-eslint/ban-types,@typescript-eslint/no-explicit-any */
import { TestBed, waitForAsync } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';

import { TestScheduler } from 'rxjs/testing';
import { AuthService, CoreUser } from '@conf-match/core';
import { Observable, of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';

describe('AuthGuard', () => {
  let router: jasmine.SpyObj<Router>;
  let guard: AuthGuard;
  let testScheduler: TestScheduler;
  let authService: AuthService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
        AuthGuard,
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj<Router>('router', ['parseUrl']),
        },
      ],
    }).compileComponents();

    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  }));

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect when not authenticated', () => {
    const result$ = guard.canActivate({} as any, { url: 'test' } as any);
    const parseUrl = {};

    router.parseUrl.and.returnValue(parseUrl as any);
    (authService as any).mockUser = null;

    testScheduler.run(({ expectObservable }) => {
      expectObservable(result$).toBe('(a|)', { a: parseUrl });
    });
  });

  it('should redirect to /signin when not authenticated', () => {
    (authService as any).mockUser = null;

    guard.canActivate({} as any, { url: 'test' } as any).subscribe();

    expect(router.parseUrl).toHaveBeenCalledWith('/signin');
  });

  it('should not redirect when authenticated and verified', () => {
    (authService as any).mockUser = { emailVerified: true };

    const result$ = guard.canActivate({} as any, { url: 'test' } as any);

    testScheduler.run(({ expectObservable }) => {
      expectObservable(result$).toBe('(a|)', { a: true });
    });
  });
});

class MockAuthService {
  public mockUser = null;

  public getUnfilteredCurrentUser(): Observable<CoreUser | null> {
    return of(this.mockUser);
  }
}
