import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@conf-match/shared';
import { Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { getTranslocoTestingModule } from '../../transloco/transloco-testing-module';
import { SharedModule as AppSharedModule } from './../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MessageThreadListComponent } from './message-thread-list.component';
import { MessageThreadListItemComponent } from './message-thread-list-item/message-thread-list-item.component';
import { ApolloTestingModule, ApolloTestingController } from 'apollo-angular/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectConferenceId, selectAttendeeId } from '@conf-match/core';
import { MessagesSelectors } from '@conf-match/client/conference/messages/data-access';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { ClientSharedUiInputModule } from '@conf-match/client/shared/ui-input';
import { ClientSharedUiTextFieldWrapperModule } from '@conf-match/client/shared/ui-text-field-wrapper';

describe('MessageThreadListComponent', () => {
  let controller: ApolloTestingController;
  let router: Router;
  let store: MockStore;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ApolloTestingModule,
        FormsModule,
        AppSharedModule,
        SharedModule,
        SharedUiIconsModule,
        ClientSharedUiInputModule,
        ClientSharedUiTextFieldWrapperModule,
        getTranslocoTestingModule(),
      ],
      declarations: [MessageThreadListComponent, MessageThreadListItemComponent],
      providers: [
        {
          provide: Actions,
          useValue: of({ type: 'test' }),
        },
        provideMockStore({
          initialState: {
            messages: {},
            core: {},
          },
        }),
      ],
    }).compileComponents();

    controller = TestBed.inject(ApolloTestingController);
    router = TestBed.inject(Router);
    store = TestBed.inject(MockStore);
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(MessageThreadListComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should show empty results when no messages', () => {
    const fixture = TestBed.createComponent(MessageThreadListComponent);

    spyOn(router, 'navigate').and.callFake(() => new Promise(() => {}));
    store.overrideSelector(selectConferenceId, '1');

    store.overrideSelector(MessagesSelectors.selectFilteredChatThreadList, []);

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('cm-no-results'))).toBeTruthy();
  });

  it('should show results when messages', () => {
    const fixture = TestBed.createComponent(MessageThreadListComponent);
    store.overrideSelector(MessagesSelectors.selectChatThreadListCount, 2);
    store.overrideSelector(selectAttendeeId, '66561d52-7210-4567-ba60-c861c8a9b468');
    store.overrideSelector(MessagesSelectors.selectFilteredChatThreadList, [
      {
        id: '1',
        lastMessageAt: '2020-04-30T22:00:00Z',
        attendee1LastReadAt: new Date(),
        attendee2LastReadAt: new Date(),
        matchId: '1',
        match: {
          id: '1',
          attendee1Id: '1',
          attendee2Id: '2',
          createdAt: '2020-04-30T22:00Z',
          attendee: {
            id: '66561d52-7210-4567-ba60-c861c8a9b468',
            fullName: 'John Doe',
            bio: 'Software Engineer',
            avatarUrl: 'test',
            company: 'Test',
            title: 'Test',
          },
          interests: [],
          desiredIdentifiers: [],
        },
        messages: {
          nextToken: null,
          items: [],
        },
      },
      {
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
      },
    ]);

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.no-results'))).toBeFalsy();
    expect(fixture.debugElement.queryAll(By.css('cm-message-thread-list-item')).length).toEqual(2);
  });
});
