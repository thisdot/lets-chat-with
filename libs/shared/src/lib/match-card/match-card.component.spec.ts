import { TestBed, waitForAsync } from '@angular/core/testing';
import { MatchCardComponent } from './match-card.component';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { By } from '@angular/platform-browser';
import { ActionButtonComponent } from '../action-button/action-button.component';
import { SharedModule } from '../shared.module';

describe('MatchCardComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MatchCardComponent, ActionButtonComponent],
      imports: [SharedModule, SharedUiIconsModule],
    }).compileComponents();
  }));

  it('should create the chip', () => {
    const fixture = TestBed.createComponent(MatchCardComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render name and description', () => {
    const fixture = TestBed.createComponent(MatchCardComponent);
    const fullName = 'Shane Williamson';
    const bio = 'CTO, Sonic';
    fixture.componentInstance.match = {
      id: '1',
      attendee1Id: 'a',
      attendee2Id: 'b',
      createdAt: '04-15-2013',
      attendee: {
        id: 'b',
        fullName,
        bio,
        avatarUrl: 'test',
        title: 'Software Engineer',
        company: 'ConfMatch',
      },
      interests: [],
      desiredIdentifiers: [],
    };

    fixture.detectChanges();

    expect(
      fixture.debugElement
        .query(By.css('.cm-match-card__content__full-name'))
        .nativeElement.textContent.trim()
    ).toEqual(fullName);
    expect(
      fixture.debugElement
        .query(By.css('.cm-match-card__content__bio'))
        .nativeElement.textContent.trim()
    ).toEqual(bio);
  });
});
