import { TestBed, waitForAsync } from '@angular/core/testing';
import { SharedModule } from '@conf-match/shared';
import { MessageThreadListItemComponent } from './message-thread-list-item.component';
import { By } from '@angular/platform-browser';
import { subHours } from 'date-fns';
import { ClientSharedUiPasswordWrapperModule } from '@conf-match/client/shared/ui-password-wrapper';
import { getTranslocoTestingModule } from '../../../transloco/transloco-testing-module';

describe('MessageThreadListItemComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, ClientSharedUiPasswordWrapperModule, getTranslocoTestingModule()],
      declarations: [MessageThreadListItemComponent],
      providers: [],
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(MessageThreadListItemComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render a badge if unread messages', () => {
    const fixture = TestBed.createComponent(MessageThreadListItemComponent);
    const component = fixture.componentInstance;

    component.messageThread = {
      id: '1',
      lastMessageAt: new Date().toISOString(),
      attendee1LastReadAt: subHours(new Date(), 1),
      attendee2LastReadAt: subHours(new Date(), 1),
      matchId: '2',
      match: {
        id: '2',
        attendee1Id: '1',
        attendee2Id: '2',
        createdAt: '2020-04-30T22:00Z',
        attendee: {
          id: '66561d52-7210-4567-ba60-c861c8a9b468',
          fullName: 'John Doe',
          bio: 'Software Engineer',
          avatarUrl: 'test',
          title: 'Software Engineer',
          company: 'ConfMatch',
        },
        interests: [],
        desiredIdentifiers: [],
      },
      messages: {
        nextToken: null,
        items: [],
      },
    };

    component.ngOnChanges({
      messageThread: true,
    });

    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('.cm-message-thread-list-item__content__badge'))
    ).toBeTruthy();
  });

  it('should not render a badge if no unread messages', () => {
    const fixture = TestBed.createComponent(MessageThreadListItemComponent);
    const component = fixture.componentInstance;

    component.messageThread = {
      id: '1',
      lastMessageAt: '2020-04-30T22:00:00Z',
      attendee1LastReadAt: new Date(),
      attendee2LastReadAt: new Date(),
      matchId: '2',
      match: {
        id: '2',
        attendee1Id: '1',
        attendee2Id: '2',
        createdAt: '2020-04-30T22:00Z',
        attendee: {
          id: '66561d52-7210-4567-ba60-c861c8a9b468',
          fullName: 'John Doe',
          bio: 'Software Engineer',
          avatarUrl: 'test',
          title: 'Software Engineer',
          company: 'Google',
        },
        interests: [],
        desiredIdentifiers: [],
      },
      messages: {
        nextToken: null,
        items: [],
      },
    };

    component.ngOnChanges({
      messageThread: true,
    });

    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('.cm-message-thread-list-item__content__badge'))
    ).toBeFalsy();
  });
});
