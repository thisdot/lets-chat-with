import { TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AuthNonVerifiedGuard } from './auth-non-verified.guard';
import { Router } from '@angular/router';
import { selectUser } from '../state/core.selectors';
import { TestScheduler } from 'rxjs/testing';
import { Store, MemoizedSelector } from '@ngrx/store';

describe('AuthNonVerifiedGuard', () => {
  let router: jasmine.SpyObj<Router>;
  let guard: AuthNonVerifiedGuard;
  let mockStore: MockStore<{}>;
  let mockSelectUser: MemoizedSelector<{}, any>;
  let testScheduler: TestScheduler;
  const routeMock: any = { snapshot: {} };
  const routeStateMock: any = { snapshot: {}, url: '/' };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            core: {},
          },
        }),
        AuthNonVerifiedGuard,
        {
          provide: Router,
          useValue: jasmine.createSpyObj<Router>('router', ['parseUrl']),
        },
      ],
    }).compileComponents();

    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    guard = TestBed.inject(AuthNonVerifiedGuard);
    mockStore = TestBed.inject(Store) as MockStore<{}>;
    mockSelectUser = mockStore.overrideSelector(selectUser, null);
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  }));

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  it('should not redirect when not authenticated', () => {
    const result$ = guard.canActivate(routeMock, routeStateMock);
    mockSelectUser.setResult(null);

    testScheduler.run(({ expectObservable }) => {
      expectObservable(result$).toBe('(a|)', { a: true });
    });
  });

  it('should redirect to /conferences when authenticated and verified', () => {
    mockSelectUser.setResult({ emailVerified: true });
    guard.canActivate(routeMock, routeStateMock).subscribe();

    expect(router.parseUrl).toHaveBeenCalledWith('/conferences');
  });

  it('should allow going to terms when authenticated and verified', () => {
    mockSelectUser.setResult({ emailVerified: true });
    guard
      .canActivate(routeMock, {
        snapshot: {},
        url: '/signup/terms',
      } as any)
      .subscribe();

    expect(router.parseUrl).not.toHaveBeenCalledWith('/conferences');
  });
});
