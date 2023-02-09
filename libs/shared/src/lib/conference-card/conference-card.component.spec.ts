import { TestBed, waitForAsync } from '@angular/core/testing';
import { ConferenceCardComponent } from './conference-card.component';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { By } from '@angular/platform-browser';
import { EventLogoComponent } from '../event-logo/event-logo.component';

const DEFAULT_CONFERENCE = {
  title: 'Conference one',
  subTitle: 'Over Dec 12, 2019',
  matches: 0,
  chats: 0,
};

describe('ConferenceCardComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ConferenceCardComponent, EventLogoComponent],
      imports: [SharedUiIconsModule],
    }).compileComponents();
  }));

  it('should create the card', () => {
    const fixture = TestBed.createComponent(ConferenceCardComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should apply the active class', () => {
    const fixture = TestBed.createComponent(ConferenceCardComponent);

    fixture.componentInstance.active = true;

    fixture.detectChanges();

    expect(fixture.debugElement.classes['cm-conference-card']).toBe(true);
    expect(fixture.debugElement.classes['cm-conference-card--active']).toBe(true);
  });

  it('should render title and description', () => {
    const fixture = TestBed.createComponent(ConferenceCardComponent);
    const title = 'Conference one';
    const subTitle = 'Over Dec 12, 2019';
    fixture.componentInstance.conference = DEFAULT_CONFERENCE;

    fixture.detectChanges();

    expect(
      fixture.debugElement
        .query(By.css('.cm-conference-card__content__title'))
        .nativeElement.textContent.trim()
    ).toEqual(title);
    expect(
      fixture.debugElement
        .query(By.css('.cm-conference-card__content__subtitle'))
        .nativeElement.textContent.trim()
    ).toEqual(subTitle);
  });

  it('should render matches', () => {
    const fixture = TestBed.createComponent(ConferenceCardComponent);
    fixture.componentInstance.conference = {
      ...DEFAULT_CONFERENCE,
      matches: 2,
    };

    fixture.detectChanges();

    expect(
      fixture.debugElement
        .queryAll(By.css('.cm-conference-card__meta__item'))[0]
        .nativeElement.textContent.trim()
    ).toContain('2 chatters');
  });

  it('should render chat when only a single chat', () => {
    const fixture = TestBed.createComponent(ConferenceCardComponent);
    fixture.componentInstance.conference = {
      ...DEFAULT_CONFERENCE,
      chats: 1,
    };

    fixture.detectChanges();

    expect(
      fixture.debugElement
        .queryAll(By.css('.cm-conference-card__meta__item'))[1]
        .nativeElement.textContent.trim()
    ).toContain('1 chat');
  });

  it('should render chats', () => {
    const fixture = TestBed.createComponent(ConferenceCardComponent);
    fixture.componentInstance.conference = {
      ...DEFAULT_CONFERENCE,
      chats: 3,
    };

    fixture.detectChanges();

    expect(
      fixture.debugElement
        .queryAll(By.css('.cm-conference-card__meta__item'))[1]
        .nativeElement.textContent.trim()
    ).toContain('3 chats');
  });
});
