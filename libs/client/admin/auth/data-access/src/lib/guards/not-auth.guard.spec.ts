/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { NotAuthGuard } from './not-auth.guard';
import { Router } from '@angular/router';
import { TestScheduler } from 'rxjs/testing';
import { Store, MemoizedSelector } from '@ngrx/store';
import { AuthSelectors } from '../store';

describe('NotAuthGuard', () => {
  let router: jasmine.SpyObj<Router>;
  let guard: NotAuthGuard;
  let mockStore: MockStore;
  // eslint-disable-next-line @typescript-eslint/ban-types
  let mockSelectUser: MemoizedSelector<{}, any>;
  let testScheduler: TestScheduler;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            core: {},
          },
        }),
        NotAuthGuard,
        {
          provide: Router,
          useValue: jasmine.createSpyObj<Router>('router', ['parseUrl']),
        },
      ],
    }).compileComponents();

    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    guard = TestBed.inject(NotAuthGuard);
    mockStore = TestBed.inject(Store) as MockStore;
    mockSelectUser = mockStore.overrideSelector(AuthSelectors.selectUser, null);
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  }));

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  it('should not redirect when not authenticated', () => {
    const result$ = guard.canActivate();
    const parseUrl = {};

    router.parseUrl.and.returnValue(parseUrl as any);
    mockSelectUser.setResult(null);

    testScheduler.run(({ expectObservable }) => {
      expectObservable(result$).toBe('(a|)', { a: true });
    });
  });

  it('should redirect when authenticated', () => {
    const result$ = guard.canActivate();
    const parseUrl = {};

    router.parseUrl.and.returnValue(parseUrl as any);
    mockSelectUser.setResult({});

    testScheduler.run(({ expectObservable }) => {
      expectObservable(result$).toBe('(a|)', { a: parseUrl });
    });
  });
});
