import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { getTranslocoTestingModule } from '../transloco/transloco-testing-module';
import { ConnectComponent } from './connect.component';
import { SharedModule, SwipeStepperComponent, StepperContentComponent } from '@conf-match/shared';
import { SharedModule as AppSharedModule } from './../shared/shared.module';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Candidate, CandidateType } from '@conf-match/api';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { SharedUiButtonsModule } from '@conf-match/shared/ui-buttons';

import { selectConferenceId } from '@conf-match/core';
import { OnboardingComponent } from './onboarding/onboarding.component';

const toIdMap = (array: Candidate[]): { [id: string]: Candidate } =>
  array.reduce(
    (map, candidate) => ({
      ...map,
      [candidate.id]: candidate,
    }),
    {}
  );

describe('ConnectComponent', () => {
  let store: MockStore<any>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        AppSharedModule,
        SharedModule,
        SharedUiButtonsModule,
        SharedUiIconsModule,
        getTranslocoTestingModule(),
      ],
      declarations: [
        ConnectComponent,
        SwipeStepperComponent,
        StepperContentComponent,
        OnboardingComponent,
      ],
      providers: [
        provideMockStore<any>({
          initialState: {
            connect: {
              eventCandidates: {},
              candidates: {},
            },
            matches: {
              newPairMatch: null,
            },
          },
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.overrideSelector(selectConferenceId, '1');
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ConnectComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should show a card when attendees are available', () => {
    const eventId = '1';
    const candidateId = '1';
    const candidates: Candidate[] = [
      {
        id: '1',
        candidateType: CandidateType.UNDECIDED,
        attendee: {
          id: '1',
          fullName: 'Shane Williamson 1',
          company: 'Sonic',
          title: 'CTO',
          bio: `I'm an investor and JS contributor. I have 20+ years of experience. Open to new ideas and would like to discuss it with a pro project architect.`,
          ownIdentifiers: [],
          desiredIdentifiers: [],
          interests: [],
          avatarUrl: 'test',
          eventId,
        },
      },
    ];

    const fixture = TestBed.createComponent(ConnectComponent);

    store.setState({
      connect: {
        eventCandidates: {
          [eventId]: [candidateId],
        },
        candidates: toIdMap(candidates),
      },
      matches: {
        newPairMatch: null,
      },
    });
    store.refreshState();

    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.css('cm-connect-card'));

    expect(cards.length).toBe(1);
  });

  it('should not show a card when no attendees are available', () => {
    store.setState({
      connect: {
        eventCandidates: {},
        candidates: {},
      },
      matches: {
        newPairMatch: null,
      },
    });
    store.refreshState();

    const fixture = TestBed.createComponent(ConnectComponent);

    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.css('cm-connect-card'));

    expect(cards.length).toBe(0);
  });

  it('should render no results when no attendees are available', () => {
    store.setState({
      connect: {
        eventCandidates: {},
        candidates: {},
      },
      matches: {
        newPairMatch: null,
      },
    });
    store.refreshState();

    const fixture = TestBed.createComponent(ConnectComponent);

    fixture.detectChanges();

    const noResults = fixture.debugElement.query(By.css('.cm-connect__no-results'));

    expect(noResults).toBeTruthy();
  });

  it('should show the next card when store updates', () => {
    const eventId = '1';
    const candidatesIds = ['1', '2'];
    const candidates = toIdMap(
      candidatesIds.map((id) => ({
        id: id,
        candidateType: CandidateType.UNDECIDED,
        attendee: {
          id: id,
          fullName: 'Shane Williamson' + id,
          company: 'Sonic',
          title: 'CTO',
          bio: `I'm an investor and JS contributor. I have 20+ years of experience. Open to new ideas and would like to discuss it with a pro project architect.`,
          ownIdentifiers: [],
          desiredIdentifiers: [],
          interests: [],
          avatarUrl: 'test',
          eventId,
        },
      }))
    );

    const fixture = TestBed.createComponent(ConnectComponent);

    store.setState({
      connect: {
        eventCandidates: {
          [eventId]: candidatesIds,
        },
        candidates,
      },
      matches: {
        newPairMatch: null,
      },
    });
    store.refreshState();

    fixture.detectChanges();

    let name = fixture.debugElement.query(By.css('.cm-connect-card__content__name'));

    expect(name.nativeElement.textContent.trim()).toBe('Shane Williamson1');

    store.setState({
      connect: {
        eventCandidates: {
          [eventId]: candidatesIds,
        },
        candidates: {
          ...candidates,
          1: {
            ...candidates['1'],
            candidateType: CandidateType.LIKE,
          },
        },
      },
      matches: {
        newPairMatch: null,
      },
    });
    store.refreshState();

    fixture.detectChanges();

    name = fixture.debugElement.query(By.css('.cm-connect-card__content__name'));
    expect(name.nativeElement.textContent.trim()).toBe('Shane Williamson2');
  });

  it('should show the previous card when store updates', () => {
    const eventId = '1';
    const candidatesIds = ['1', '2'];
    const candidates = toIdMap(
      candidatesIds.map((id) => ({
        id: id,
        candidateType: CandidateType.UNDECIDED,
        attendee: {
          id: id,
          fullName: 'Shane Williamson' + id,
          company: 'Sonic',
          title: 'CTO',
          bio: `I'm an investor and JS contributor. I have 20+ years of experience. Open to new ideas and would like to discuss it with a pro project architect.`,
          ownIdentifiers: [],
          desiredIdentifiers: [],
          interests: [],
          avatarUrl: 'test',
          eventId,
        },
      }))
    );

    const fixture = TestBed.createComponent(ConnectComponent);

    store.setState({
      connect: {
        eventCandidates: {
          [eventId]: candidatesIds,
        },
        candidates: {
          ...candidates,
          1: {
            ...candidates['1'],
            candidateType: CandidateType.DISLIKE,
          },
        },
      },
      matches: {
        newPairMatch: null,
      },
    });
    store.refreshState();

    fixture.detectChanges();

    let name = fixture.debugElement.query(By.css('.cm-connect-card__content__name'));
    expect(name.nativeElement.textContent.trim()).toBe('Shane Williamson2');

    store.setState({
      connect: {
        eventCandidates: {
          [eventId]: candidatesIds,
        },
        candidates: {
          ...candidates,
          1: {
            ...candidates['1'],
            candidateType: CandidateType.UNDECIDED,
          },
        },
      },
      matches: {
        newPairMatch: null,
      },
    });
    store.refreshState();

    fixture.detectChanges();

    name = fixture.debugElement.query(By.css('.cm-connect-card__content__name'));
    expect(name.nativeElement.textContent.trim()).toBe('Shane Williamson1');
  });
});
