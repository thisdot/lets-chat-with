import { TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Match } from '@conf-match/api';
import { SharedModule } from '@conf-match/shared';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { Actions } from '@ngrx/effects';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { getTranslocoTestingModule } from '../transloco/transloco-testing-module';
import { SharedModule as AppSharedModule } from './../shared/shared.module';
import { MatchesComponent } from './matches.component';
import { MatchesSelectors } from '@conf-match/client/conference/matches/data-access';

describe('MatchesComponent', () => {
  let router: Router;
  let mockStore: MockStore;
  let mockMatchesSelector: MemoizedSelector<any, Array<Match>>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppSharedModule,
        SharedModule,
        SharedUiIconsModule,
        getTranslocoTestingModule(),
      ],
      declarations: [MatchesComponent],
      providers: [
        {
          provide: Actions,
          useValue: of({ type: 'test' }),
        },
        provideMockStore({
          initialState: {
            core: {},
          },
        }),
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    mockStore = TestBed.inject(MockStore);
    mockMatchesSelector = mockStore.overrideSelector(MatchesSelectors.selectMatches, []);
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(MatchesComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should show a card when matches are available', () => {
    mockMatchesSelector.setResult([
      {
        id: '1',
        attendee1Id: '1',
        attendee2Id: '2',
        createdAt: '04/24/2021',
        attendee: {
          id: '2',
          fullName: 'Shane Williamson 1',
          bio: `I'm an investor and JS contributor. I have 20+ years of experience. Open to new ideas and would like to discuss it with a pro project architect.`,
          avatarUrl: 'test',
          title: 'Investor',
          company: 'This Dot',
        },
        interests: [],
        desiredIdentifiers: [],
      },
    ]);

    const fixture = TestBed.createComponent(MatchesComponent);

    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.css('cm-match-card'));

    expect(cards.length).toBe(1);
  });

  it('should not show a card when no matches are available', () => {
    const fixture = TestBed.createComponent(MatchesComponent);

    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.css('cm-match-card'));

    expect(cards.length).toBe(0);
  });

  it('should render no results when no matches are available', () => {
    const fixture = TestBed.createComponent(MatchesComponent);

    fixture.detectChanges();

    const noResults = fixture.debugElement.query(By.css('cm-no-results'));

    expect(noResults).toBeTruthy();
  });

  it('should navigate to profile when clicking info', () => {
    spyOn(router, 'navigate');
    mockMatchesSelector.setResult([
      {
        id: '1',
        attendee1Id: '1',
        attendee2Id: '2',
        createdAt: '04/24/2021',
        attendee: {
          id: '2',
          fullName: 'Shane Williamson 1',
          bio: `I'm an investor and JS contributor. I have 20+ years of experience. Open to new ideas and would like to discuss it with a pro project architect.`,
          avatarUrl: 'test',
          title: 'Investor',
          company: 'This Dot',
        },
        interests: [],
        desiredIdentifiers: [],
      },
    ]);

    const fixture = TestBed.createComponent(MatchesComponent);

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.cm-match-card__action__info'));

    button.triggerEventHandler('click', {});

    expect(router.navigate).toHaveBeenCalled();
  });
});
