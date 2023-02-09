import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { ConnectEffects } from './connect.effects';
import { provideMockActions } from '@ngrx/effects/testing';

import { TestScheduler } from 'rxjs/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { conferenceSelected, joinConferenceSuccess } from '@conf-match/core';
import { ConnectActions, ConnectAPIActions } from '../actions';
import {
  Candidate,
  CandidatesByEventGQL,
  CandidateType,
  UpdateCandidateGQL,
} from '@conf-match/api';

describe('ConnectEffects', () => {
  let effects: ConnectEffects;
  let actions: Observable<any>;
  let testScheduler: TestScheduler;
  let candidatesByEventGQL: CandidatesByEventGQL;
  let updateCandidateGQL: UpdateCandidateGQL;
  let store: MockStore<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      providers: [
        ConnectEffects,
        provideMockActions(() => actions),
        provideMockStore({
          initialState: {
            core: {},
          },
        }),
      ],
    });

    effects = TestBed.inject(ConnectEffects);
    store = TestBed.inject(MockStore);
    candidatesByEventGQL = TestBed.inject(CandidatesByEventGQL);
    updateCandidateGQL = TestBed.inject(UpdateCandidateGQL);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('listCandidates$', () => {
    [
      conferenceSelected({
        conferenceId: '1',
      }),
      joinConferenceSuccess({ conferenceId: '1' }),
    ].forEach((action) => {
      it('should dispatch getCandidatesSuccessful on success', () => {
        const eventId = '1';
        const candidates: Array<Candidate> = [
          {
            id: '1',
            attendee: {
              id: '1',
              fullName: 'John Doe',
              title: 'CEO',
              company: 'Sonic',
              pronouns: 'he/him',
              bio: '',
              interests: [],
              ownIdentifiers: [],
              desiredIdentifiers: [],
              avatarUrl: 'test',
              eventId,
            },
            candidateType: CandidateType.UNDECIDED,
          },
        ];
        const outcome = ConnectAPIActions.getCandidatesSuccessful({
          candidates,
          eventId,
        });

        testScheduler.run(({ hot, cold, expectObservable }) => {
          actions = hot('-a', { a: action });

          const response = cold('-b|', {
            b: {
              data: {
                candidatesByEventId: {
                  items: candidates,
                },
              },
            },
          });
          // FIXME - ColdObservable type doesn't match  function return type
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          spyOn(candidatesByEventGQL, 'fetch').and.returnValue(response);

          expectObservable(effects.listCandidates$).toBe('--b', { b: outcome });
        });
      });
    });
  });

  describe('attendeeLiked$', () => {
    it('should dispatch attendeeLikedSuccess on success', () => {
      const action = ConnectActions.attendeeLiked({
        id: '1',
        identifiers: [],
        interests: [],
      });
      const candidates = [
        {
          id: '1',
          attendeeId: '1',
          attendee: {
            id: '1',
            fullName: 'John Doe',
            title: 'CEO',
            company: 'Sonic',
            pronouns: 'he/him',
            bio: '',
            interests: [],
            ownIdentifiers: [],
            desiredIdentifiers: [],
            eventId: '1',
            avatarUrl: 'test',
          },
          candidateType: CandidateType.UNDECIDED,
        },
      ];

      const outcome = [
        ConnectAPIActions.attendeeLikedSuccess({
          candidate: candidates[0],
        }),
        ConnectAPIActions.createLike({
          likedAttendeeId: candidates[0].attendee.id,
        }),
      ];

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: action });

        const response = cold('-b|', {
          b: {
            data: {
              updateCandidate: candidates[0],
            },
          },
        });
        spyOn(updateCandidateGQL, 'mutate').and.returnValue(response);

        expectObservable(effects.attendeeLiked$).toBe('--(bc)', { b: outcome[0], c: outcome[1] });
      });
    });

    it('should dispatch attendeeLikedFailed on failure', () => {
      const action = ConnectActions.attendeeLiked({
        id: '1',
        identifiers: [],
        interests: [],
      });
      const outcome = ConnectAPIActions.attendeeLikedFailed({
        id: '1',
      });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: action });

        const response = cold('-#');
        // FIXME - ColdObservable type doesn't match  function return type
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        spyOn(updateCandidateGQL, 'mutate').and.returnValue(response);

        expectObservable(effects.attendeeLiked$).toBe('--b', { b: outcome });
      });
    });
  });

  describe('attendeeDisliked$', () => {
    it('should dispatch attendeeDislikedSuccess on success', () => {
      const action = ConnectActions.attendeeDisliked({
        id: '1',
      });
      const candidates: Array<Candidate> = [
        {
          id: '1',
          attendee: {
            id: '1',
            fullName: 'John Doe',
            title: 'CEO',
            company: 'Sonic',
            pronouns: 'he/him',
            bio: '',
            interests: [],
            ownIdentifiers: [],
            desiredIdentifiers: [],
            avatarUrl: 'test',
            eventId: '1',
          },
          candidateType: CandidateType.UNDECIDED,
        },
      ];
      const outcome = ConnectAPIActions.attendeeDislikedSuccess({
        candidate: candidates[0],
      });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: action });

        const response = cold('-b|', {
          b: {
            data: {
              updateCandidate: candidates[0],
            },
          },
        });
        spyOn(updateCandidateGQL, 'mutate').and.returnValue(response);

        expectObservable(effects.attendeeDisliked$).toBe('--b', { b: outcome });
      });
    });

    it('should dispatch attendeeDislikedFailed on failure', () => {
      const action = ConnectActions.attendeeDisliked({
        id: '1',
      });
      const outcome = ConnectAPIActions.attendeeDislikedFailed({
        id: '1',
      });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: action });

        const response = cold('-#');
        // FIXME - ColdObservable type doesn't match  function return type
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        spyOn(updateCandidateGQL, 'mutate').and.returnValue(response);

        expectObservable(effects.attendeeDisliked$).toBe('--b', { b: outcome });
      });
    });
  });

  describe('attendeeLikeDislikeUndoneStarted$', () => {
    it('should dispatch attendeeLikeDislikeUndoneSuccess on success', () => {
      const action = ConnectActions.attendeeLikeDislikeUndoneStarted({
        id: '1',
        initialType: CandidateType.LIKE,
      });
      const candidates = [
        {
          id: '1',
          attendeeId: '1',
          attendee: {
            id: '1',
            fullName: 'John Doe',
            title: 'CEO',
            company: 'Sonic',
            pronouns: 'he/him',
            bio: '',
            interests: [],
            ownIdentifiers: [],
            desiredIdentifiers: [],
            avatarUrl: 'test',
            eventId: '1',
          },
          candidateType: CandidateType.UNDECIDED,
        },
      ];
      const outcome = ConnectAPIActions.attendeeLikeDislikeUndoneSuccess({
        candidate: candidates[0],
      });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: action });

        const response = cold('-b|', {
          b: {
            data: {
              updateCandidate: candidates[0],
            },
          },
        });
        spyOn(updateCandidateGQL, 'mutate').and.returnValue(response);

        expectObservable(effects.attendeeLikeDislikeUndoneStarted$).toBe('--b', { b: outcome });
      });
    });

    it('should dispatch attendeeLikeDislikeUndoneFailed on failure', () => {
      const action = ConnectActions.attendeeLikeDislikeUndoneStarted({
        id: '1',
        initialType: CandidateType.LIKE,
      });
      const outcome = ConnectAPIActions.attendeeLikeDislikeUndoneFailed({
        id: '1',
        initialType: CandidateType.LIKE,
      });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: action });

        const response = cold('-#');
        // FIXME - ColdObservable type doesn't match  function return type
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        spyOn(updateCandidateGQL, 'mutate').and.returnValue(response);

        expectObservable(effects.attendeeLikeDislikeUndoneStarted$).toBe('--b', { b: outcome });
      });
    });
  });
});
