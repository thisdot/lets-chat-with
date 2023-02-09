import { TestBed, waitForAsync } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { TestScheduler } from 'rxjs/testing';
import { Store } from '@ngrx/store';
import { ConferenceGuard } from './conference.guard';
import { ListAttendeesGQL } from '@conf-match/api';
import { of } from 'rxjs';
import { selectOwnerId } from '@conf-match/core';

describe('ConferenceGuard', () => {
  let router: jasmine.SpyObj<Router>;
  let guard: ConferenceGuard;
  let mockStore: MockStore<{}>;
  let testScheduler: TestScheduler;
  let listAttendeesGQL;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            core: {},
          },
        }),
        ConferenceGuard,
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
    guard = TestBed.inject(ConferenceGuard);
    listAttendeesGQL = TestBed.inject(ListAttendeesGQL);
    mockStore = TestBed.inject(Store) as MockStore<{}>;
    mockStore.overrideSelector(selectOwnerId, 'user');
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  }));

  it('should redirect when not part of the event', () => {
    // FIXME
    const redirectRoute = {} as any;
    router.parseUrl.and.returnValue(redirectRoute);

    testScheduler.run(({ cold, expectObservable }) => {
      const attendees = {
        data: {
          listAttendees: {
            items: [
              {
                eventId: 'b',
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

  it('should redirect to /conferences when not part of the event', () => {
    // FIXME
    const redirectRoute = {} as any;
    router.parseUrl.and.returnValue(redirectRoute);

    const attendees = {
      data: {
        listAttendees: {
          items: [
            {
              eventId: 'b',
            },
          ],
        },
      },
    };

    listAttendeesGQL.fetch.and.returnValue(of(attendees));

    guard
      .canActivate(
        {
          paramMap: new Map([['conferenceId', 'a']]),
        } as any,
        null
      )
      .subscribe();

    expect(router.parseUrl).toHaveBeenCalledWith('/conferences');
  });

  it('should not redirect when part of the event', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const attendees = {
        data: {
          listAttendees: {
            items: [
              {
                eventId: 'a',
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
