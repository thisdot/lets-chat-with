import { TestBed, waitForAsync } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { TestScheduler } from 'rxjs/testing';
import { AuthService } from '../amplify/auth.service';
import { Observable, of } from 'rxjs';
import { CoreUser } from '../models';
import { provideMockStore } from '@ngrx/store/testing';

describe('AuthGuard', () => {
  let router: jasmine.SpyObj<Router>;
  let guard: AuthGuard;
  let testScheduler: TestScheduler;
  let authService: AuthService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
        provideMockStore(),
        AuthGuard,
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

  it('should redirect to /signup/verify when authenticated, but not verified', () => {
    (authService as any).mockUser = { emailVerified: false };
    guard.canActivate((authService as any).mockUser as any, { url: 'test' } as any).subscribe();

    expect(router.parseUrl).toHaveBeenCalledWith('/signup/verify');
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
