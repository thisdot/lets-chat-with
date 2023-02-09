import { TestBed, waitForAsync } from '@angular/core/testing';
import { ConnectCardComponent } from './connect-card.component';
import { By } from '@angular/platform-browser';
import { ChipComponent } from '../chip/chip.component';
import { ActionButtonComponent } from '../action-button/action-button.component';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { SharedModule } from '../shared.module';
import { getTranslocoTestingModule } from '@conf-match/client/shared/testing/util-testing';

describe('ConnectCardComponent', () => {
  let attendee;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectCardComponent, ChipComponent, ActionButtonComponent],
      imports: [SharedModule, SharedUiIconsModule, getTranslocoTestingModule()],
    }).compileComponents();

    attendee = {
      fullName: 'Shane Williamson',
      company: 'Sonic',
      title: 'CTO',
      bio: 'Summary goes here',
      interests: [
        { id: 'a', name: 'a', group: 'a' },
        { id: 'b', name: 'b', group: 'b' },
        { id: 'c', name: 'c', group: 'c' },
      ],
      desiredIdentifiers: [
        { id: 'a', name: 'a' },
        { id: 'b', name: 'b' },
      ],
      ownIdentifiers: [
        { id: 'c', name: 'c' },
        { id: 'd', name: 'd' },
      ],
    };
  }));

  it('should create the card', () => {
    const fixture = TestBed.createComponent(ConnectCardComponent);
    const component = fixture.componentInstance;
    component.attendee = attendee;
    expect(component).toBeTruthy();
  });

  it('should apply the default class', () => {
    const fixture = TestBed.createComponent(ConnectCardComponent);

    fixture.componentInstance.attendee = attendee;

    fixture.detectChanges();

    expect(fixture.debugElement.classes['cm-connect-card']).toBe(true);
  });

  it('should render name, description and summary', () => {
    const fixture = TestBed.createComponent(ConnectCardComponent);

    fixture.componentInstance.attendee = attendee;

    fixture.detectChanges();

    expect(
      fixture.debugElement
        .query(By.css('.cm-connect-card__content__name'))
        .nativeElement.textContent.trim()
    ).toEqual(attendee.fullName);
    expect(
      fixture.debugElement
        .query(By.css('.cm-connect-card__content__description'))
        .nativeElement.textContent.trim()
    ).toEqual(attendee.title + ', ' + attendee.company);

    expect(
      fixture.debugElement
        .query(By.css('.cm-connect-card__summary'))
        .nativeElement.textContent.trim()
    ).toEqual(attendee.bio);
  });

  it('should render looking for chips', () => {
    const fixture = TestBed.createComponent(ConnectCardComponent);

    fixture.componentInstance.attendee = attendee;

    fixture.detectChanges();

    expect(
      fixture.debugElement.queryAll(By.css('.cm-connect-card__looking-for .cm-chip')).length
    ).toEqual(2);
  });

  it('should render interests chips', () => {
    const fixture = TestBed.createComponent(ConnectCardComponent);

    fixture.componentInstance.attendee = attendee;

    fixture.detectChanges();

    expect(
      fixture.debugElement.queryAll(By.css('.cm-connect-card__interests .cm-chip')).length
    ).toEqual(3);
  });

  it('should render who-am-i chips', () => {
    const fixture = TestBed.createComponent(ConnectCardComponent);

    fixture.componentInstance.attendee = attendee;

    fixture.detectChanges();

    expect(
      fixture.debugElement.queryAll(By.css('.cm-connect-card__who-i-am .cm-chip')).length
    ).toEqual(2);
  });
});
