import { TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { TestScheduler } from 'rxjs/testing';
import { Store } from '@ngrx/store';
import { JoinConferenceGuard } from './join-conference.guard';
import { ListAttendeesGQL } from '@conf-match/api';
import { of } from 'rxjs';
import { SharedUiButtonsModule } from '@conf-match/shared/ui-buttons';
import { getTranslocoTestingModule } from '../../transloco/transloco-testing-module';

describe('JoinConferenceGuard', () => {
  let router: jasmine.SpyObj<Router>;
  let guard: JoinConferenceGuard;
  let mockStore: MockStore<{}>;
  let testScheduler: TestScheduler;
  let listAttendeesGQL;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SharedUiButtonsModule, getTranslocoTestingModule(), SharedUiButtonsModule],
      providers: [
        provideMockStore({
          initialState: {
            core: {},
          },
        }),
        JoinConferenceGuard,
        {
          provide: Router,
          useValue: jasmine.createSpyObj<Router>('router', ['parseUrl']),
        },
        {
          provide: ListAttendeesGQL,
          useValue: jasmine.createSpyObj('listAttendeesGQL', {
            fetch: of(true),
          }),
        },
      ],
    }).compileComponents();

    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    guard = TestBed.inject(JoinConferenceGuard);
    listAttendeesGQL = TestBed.inject(ListAttendeesGQL);
    mockStore = TestBed.inject(Store) as MockStore<{}>;
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  }));

  it('should redirect when part of the event', () => {
    // FIXME
    const redirectRoute = {} as any;
    router.parseUrl.and.returnValue(redirectRoute);

    testScheduler.run(({ cold, expectObservable }) => {
      const attendees = {
        data: {
          listAttendees: {
            items: [
              {
                event: {
                  id: 'a',
                },
              },
            ],
          },
        },
      };

      listAttendeesGQL.fetch.and.returnValue(cold('-a', { a: attendees }));

      const result = guard.canActivate(
        {
          paramMap: new Map([['conferenceId', 'a']]),
        } as any,
        null
      );

      expectObservable(result).toBe('-a', { a: redirectRoute });
    });
  });

  it('should not redirect when not part of the event', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const attendees = {
        data: {
          listAttendees: {
            items: [
              {
                event: {
                  id: 'b',
                },
              },
            ],
          },
        },
      };

      listAttendeesGQL.fetch.and.returnValue(cold('-a', { a: attendees }));

      const result = guard.canActivate(
        {
          paramMap: new Map([['conferenceId', 'a']]),
        } as any,
        null
      );

      expectObservable(result).toBe('-a', { a: true });
    });
  });
});
