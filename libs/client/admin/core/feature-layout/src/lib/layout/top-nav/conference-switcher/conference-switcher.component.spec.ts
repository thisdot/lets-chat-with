import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ConferencesSelectors,
  selectConference,
  conferencesMock,
  ConferencesActions,
} from '@conf-match/core';
import { DropdownModule, SharedModule } from '@conf-match/shared';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ConferenceSwitcherItemComponent } from './conference-switcher-item/conference-switcher-item.component';
import { ConferenceSwitcherSelectedElementComponent } from './conference-switcher-selected-element/conference-switcher-selected-element.component';
import { getTranslocoTestingModule } from '@conf-match/client/shared/testing/util-testing';

import { ConferenceSwitcherComponent } from './conference-switcher.component';

describe('ConferenceSwitcherComponent', () => {
  let component: ConferenceSwitcherComponent;
  let fixture: ComponentFixture<ConferenceSwitcherComponent>;
  let store: MockStore;
  let spyDispatch: (...args: any[]) => void;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConferenceSwitcherComponent,
        ConferenceSwitcherItemComponent,
        ConferenceSwitcherSelectedElementComponent,
      ],
      imports: [
        SharedModule,
        SharedUiIconsModule,
        getTranslocoTestingModule(),
        DropdownModule,
        RouterTestingModule,
      ],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: ConferencesSelectors.selectAttendeeConferences,
              value: conferencesMock,
            },
            {
              selector: selectConference,
              value: conferencesMock[0],
            },
          ],
        }),
      ],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    spyDispatch = spyOn(store, 'dispatch');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConferenceSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch an attempt to load conference on init', () => {
    const action = ConferencesActions.conferencesLoadAttempted();

    expect(spyDispatch).toHaveBeenCalledWith(action);
  });
});
