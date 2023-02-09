import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { getTranslocoTestingModule } from '../../../transloco/transloco-testing-module';
import { MessageListComponent } from './message-list.component';
import { SharedModule } from '@conf-match/shared';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MessageListItemComponent } from './message-list-item/message-list-item.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DatePipe } from '@angular/common';
import { SharedUiButtonsModule } from '@conf-match/shared/ui-buttons';

describe('MessageListComponent', () => {
  let datePipe: DatePipe;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        SharedModule,
        ScrollingModule,
        getTranslocoTestingModule(),
        SharedUiButtonsModule,
      ],
      declarations: [MessageListComponent, MessageListItemComponent],
      providers: [DatePipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    datePipe = TestBed.inject(DatePipe);
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(MessageListComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should group messages by date', () => {
    const fixture = TestBed.createComponent(MessageListComponent);
    const component = fixture.componentInstance;

    const changes = {
      messages: true,
    };

    component.messages = {
      items: [
        {
          id: '1',
          createdAt: '2020-04-30T10:00:00Z',
          content: 'Hello',
          attendeeId: 'A',
        },
        {
          id: '2',
          createdAt: '2020-04-30T10:00:00Z',
          content: 'Hello',
          attendeeId: 'A',
        },
        {
          id: '3',
          createdAt: '2020-04-29T10:00:00Z',
          content: 'Hello',
          attendeeId: 'A',
        },
      ],
    };

    component.ngOnChanges(changes);

    fixture.detectChanges();

    const groups = fixture.debugElement.queryAll(By.css('.cm-message-list__messages__group'));

    expect(groups.length).toBe(2);
    expect(groups[0].query(By.css('.date-separator')).nativeElement.textContent).toContain(
      'Apr 29, 2020'
    );
    expect(groups[1].query(By.css('.date-separator')).nativeElement.textContent).toContain(
      'Apr 30, 2020'
    );
    expect(groups[0].queryAll(By.css('.cm-message-list-item')).length).toBe(1);
    expect(groups[1].queryAll(By.css('.cm-message-list-item')).length).toBe(2);
  });

  it('should sort messages messages by time', () => {
    const fixture = TestBed.createComponent(MessageListComponent);
    const component = fixture.componentInstance;

    const changes = {
      messages: true,
    };

    component.messages = {
      items: [
        {
          id: '1',
          createdAt: '2020-04-30T10:01:00Z',
          content: 'Hello',
          attendeeId: 'A',
        },
        {
          id: '2',
          createdAt: '2020-04-30T10:00:00Z',
          content: 'Hello',
          attendeeId: 'A',
        },
        {
          id: '3',
          createdAt: '2020-04-30T10:02:00Z',
          content: 'How are you?',
          attendeeId: 'A',
        },
      ],
    };

    component.ngOnChanges(changes);

    fixture.detectChanges();

    const groups = fixture.debugElement.queryAll(By.css('.cm-message-list__messages__group'));
    const messages = groups[0].queryAll(By.css('.cm-message-list-item'));

    expect(
      messages[0].query(By.css('.cm-message-list-item__createdAt')).nativeElement.textContent
    ).toContain(datePipe.transform('2020-04-30T10:00:00Z', 'shortTime'));
    expect(
      messages[1].query(By.css('.cm-message-list-item__createdAt')).nativeElement.textContent
    ).toContain(datePipe.transform('2020-04-30T10:01:00Z', 'shortTime'));
    expect(
      messages[2].query(By.css('.cm-message-list-item__createdAt')).nativeElement.textContent
    ).toContain(datePipe.transform('2020-04-30T10:02:00Z', 'shortTime'));
  });

  it('should visualize if attendee is the author', () => {
    const fixture = TestBed.createComponent(MessageListComponent);
    const component = fixture.componentInstance;

    const changes = {
      messages: true,
    };

    component.attendeeId = 'A';
    component.messages = {
      items: [
        {
          id: '1',
          createdAt: '2020-04-30T10:01:00Z',
          content: 'Hi',
          attendeeId: 'A',
        },
        {
          id: '2',
          createdAt: '2020-04-30T10:00:00Z',
          content: 'Hello',
          attendeeId: 'B',
        },
      ],
    };

    component.ngOnChanges(changes);

    fixture.detectChanges();

    const groups = fixture.debugElement.queryAll(By.css('.cm-message-list__messages__group'));
    const messages = groups[0].queryAll(By.css('.cm-message-list-item'));

    expect(messages[0].classes['cm-message-list-item--sent']).toBeFalsy();
    expect(messages[1].classes['cm-message-list-item--sent']).toBe(true);
  });
});
