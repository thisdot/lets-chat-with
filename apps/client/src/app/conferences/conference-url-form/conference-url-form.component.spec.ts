import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';

import { ConferenceUrlFormComponent } from './conference-url-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@conf-match/shared';
import { SharedModule as AppSharedModule } from './../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { SharedUiButtonsModule } from '@conf-match/shared/ui-buttons';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { conferenceJoinAttempted, conferencesMock } from '@conf-match/core';
import { getTranslocoTestingModule } from '../../transloco/transloco-testing-module';

describe('ConferenceUrlFormComponent', () => {
  let component: ConferenceUrlFormComponent;
  let fixture: ComponentFixture<ConferenceUrlFormComponent>;
  let controller: ApolloTestingController;
  let store: MockStore;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ConferenceUrlFormComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        AppSharedModule,
        SharedModule,
        ApolloTestingModule,
        SharedUiButtonsModule,
        getTranslocoTestingModule(),
      ],
      providers: [provideMockStore()],
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    controller = TestBed.inject(ApolloTestingController);
    fixture = TestBed.createComponent(ConferenceUrlFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit', fakeAsync(() => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const conference: any = {};
    conferencesMock.forEach((conf) => (conference[conf.id] = conference));
    store.setState({
      conferences: {
        attendeeConferences: conferencesMock.filter((conf) => conf.letsChatWithUrl !== 'ng-conf'),
      },
      core: {
        conferenceId: conferencesMock[0].id,
        conference,
      },
    });
    component.form.setValue({ domain: 'ng-conf' });
    component.submit();

    expect(dispatchSpy).toHaveBeenCalledOnceWith(
      conferenceJoinAttempted({ letsChatWithUrl: 'ng-conf' })
    );
  }));

  it('should also submit with duplicate conf', fakeAsync(() => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const conference: any = {};
    conferencesMock.forEach((conf) => (conference[conf.id] = conference));
    store.setState({
      conferences: {
        attendeeConferences: conferencesMock,
      },
      core: {
        conferenceId: conferencesMock[0].id,
        conference,
      },
    });
    component.form.setValue({ domain: 'ng-conf' });
    component.submit();

    expect(dispatchSpy).toHaveBeenCalledOnceWith(
      conferenceJoinAttempted({ letsChatWithUrl: 'ng-conf' })
    );
  }));
});
