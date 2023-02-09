import { TestBed, waitForAsync } from '@angular/core/testing';
import { Attendee } from '@conf-match/api';
import { ProfileCardComponent } from './profile-card.component';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { By } from '@angular/platform-browser';
import { ChipComponent } from '../chip/chip.component';
import { ActionButtonComponent } from '../action-button/action-button.component';
import { getTranslocoTestingModule } from '@conf-match/client/shared/testing/util-testing';

describe('ProfileCardComponent', () => {
  let user: Attendee;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileCardComponent, ChipComponent, ActionButtonComponent],
      imports: [SharedUiIconsModule, getTranslocoTestingModule()],
    }).compileComponents();

    user = {
      id: 'testid',
      fullName: 'Shane Williamson',
      title: 'CTO, Sonic',
      bio: 'Summary goes here',
      avatarUrl: '',
      pronouns: 'he/him',
      interests: [
        { id: 'a', name: 'a', group: 'a' },
        { id: 'b', name: 'b', group: 'b' },
        { id: 'c', name: 'c', group: 'c' },
      ],
      desiredIdentifiers: [
        { id: 'a', name: 'a' },
        { id: 'b', name: 'b' },
      ],
      ownIdentifiers: [],
      eventId: 'eventId',
    };
  }));

  it('should create the card', () => {
    const fixture = TestBed.createComponent(ProfileCardComponent);
    const component = fixture.componentInstance;
    component.attendee = user;
    expect(component).toBeTruthy();
  });

  it('should render name, description, summary and pronouns', () => {
    const fixture = TestBed.createComponent(ProfileCardComponent);

    fixture.componentInstance.attendee = user;

    fixture.detectChanges();

    expect(
      fixture.debugElement
        .query(By.css('.cm-profile-card__content__name'))
        .nativeElement.textContent.trim()
    ).toEqual(user.fullName);
    expect(
      fixture.debugElement
        .query(By.css('.cm-profile-card__content__description'))
        .nativeElement.textContent.trim()
    ).toEqual(user.title);
    expect(
      fixture.debugElement
        .query(By.css('.cm-profile-card__content__pronouns'))
        .nativeElement.textContent.trim()
    ).toEqual(user.pronouns);

    expect(
      fixture.debugElement
        .query(By.css('.cm-profile-card__summary'))
        .nativeElement.textContent.trim()
    ).toEqual(user.bio);
  });

  it('should render looking for chips', () => {
    const fixture = TestBed.createComponent(ProfileCardComponent);

    fixture.componentInstance.attendee = user;

    fixture.detectChanges();

    const connectionsSection = fixture.debugElement.queryAll(
      By.css('.cm-profile-card__box__section')
    )[0];

    expect(connectionsSection.queryAll(By.css('.cm-chip')).length).toEqual(2);
  });

  it('should render interests chips', () => {
    const fixture = TestBed.createComponent(ProfileCardComponent);

    fixture.componentInstance.attendee = user;

    fixture.detectChanges();

    const interestsSection = fixture.debugElement.queryAll(
      By.css('.cm-profile-card__box__section')
    )[2];

    expect(interestsSection.queryAll(By.css('.cm-chip')).length).toEqual(3);
  });
});
