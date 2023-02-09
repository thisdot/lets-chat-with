import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { ProfileEffects } from './profile.effects';
import { provideMockActions } from '@ngrx/effects/testing';

import { TestScheduler } from 'rxjs/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';

import { GetAttendeeGQL, UpdateAttendeeGQL, Attendee } from '@conf-match/api';
import { ModalService } from '@conf-match/shared';
import { NotificationService } from '@conf-match/shared/ui-notifications';
import { RouterTestingModule } from '@angular/router/testing';
import { OverlayModule } from '@angular/cdk/overlay';
import { profileOpened, attendeeRetrieved } from '@conf-match/core';

describe('ProfileEffects', () => {
  let effects: ProfileEffects;
  let actions: Observable<any>;
  let testScheduler: TestScheduler;
  let store: MockStore<any>;

  let getAttendeeGQL: GetAttendeeGQL;
  let updateAttendeeGQL: UpdateAttendeeGQL;
  let modalService: ModalService;
  let notificationService: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule, RouterTestingModule, OverlayModule],
      providers: [
        ProfileEffects,
        provideMockActions(() => actions),
        provideMockStore({
          initialState: {
            core: {},
          },
        }),
      ],
    });

    effects = TestBed.inject(ProfileEffects);
    store = TestBed.inject(MockStore);

    getAttendeeGQL = TestBed.inject(GetAttendeeGQL);
    updateAttendeeGQL = TestBed.inject(UpdateAttendeeGQL);
    modalService = TestBed.inject(ModalService);
    notificationService = TestBed.inject(NotificationService);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  describe('profileOpened$', () => {
    it('should dispatch attendeeRetrieved on success', () => {
      const action = profileOpened();
      const attendee: Attendee = {
        id: '1',
        fullName: 'John Doe',
        title: 'CEO',
        company: 'Sonic',
        pronouns: 'he/him',
        bio: '',
        interests: [],
        desiredIdentifiers: [],
        ownIdentifiers: [],
        eventId: '',
        avatarUrl: 'https://randomuser.me/api/portraits/women/23.jpg',
      };
      const outcome = attendeeRetrieved({
        attendee,
      });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: action });

        const response = cold('-b|', {
          b: {
            data: {
              getAttendee: attendee,
            },
          },
        });
        // FIXME - ColdObservable type doesn't match  function return type
        // @ts-ignore
        spyOn(getAttendeeGQL, 'fetch').and.returnValue(response);

        expectObservable(effects.profileOpened$).toBe('--b', { b: outcome });
      });
    });
  });
});
