import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SharedModule, ModalController, CM_MODAL_DATA, ModalService } from '@conf-match/shared';

import { ConnectionActionMenuComponent } from './connection-action-menu.component';
import {
  ReportModalComponent,
  ClientConferenceReportFeatureReportModalModule,
} from '@conf-match/client/conference/report/feature-report-modal';
import { provideMockStore } from '@ngrx/store/testing';
import { getTranslocoTestingModule } from '../../transloco/transloco-testing-module';

describe('ConnectionActionMenuComponent', () => {
  let component: ConnectionActionMenuComponent;
  let fixture: ComponentFixture<ConnectionActionMenuComponent>;
  let ctrl: ModalController<void>;
  let modalService: ModalService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        ClientConferenceReportFeatureReportModalModule,
        getTranslocoTestingModule(),
      ],
      declarations: [ConnectionActionMenuComponent],
      providers: [
        provideMockStore({
          initialState: {
            core: {},
          },
        }),
        {
          provide: CM_MODAL_DATA,
          useValue: {
            conferenceId: '123',
            reportedAttendee: {
              id: '123',
              attendee1Id: '1',
              attendee2Id: '2',
              attendee: {
                id: '123',
              },
            },
            isMatch: false,
          },
        },
        {
          provide: ModalController,
          useValue: jasmine.createSpyObj('ModalController', ['close']),
        },
      ],
    }).compileComponents();

    ctrl = TestBed.inject(ModalController);
    modalService = TestBed.inject(ModalService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionActionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate open report modal', () => {
    const openModalSpy = spyOn(modalService, 'openDockedModal');

    component.report();

    expect(ctrl.close).toHaveBeenCalled();
    expect(openModalSpy).toHaveBeenCalledWith(
      ReportModalComponent,
      {
        eventId: '123',
        reportingAttendeeId: '1',
        reportedAttendeeId: '2',
      },
      {
        direction: 'right',
        resizeable: false,
        removeSpacing: true,
        rounded: false,
        closeButton: false,
        closeIcon: false,
      }
    );
  });

  it('should close to modal on each action', () => {
    component.unmatch();
    component.report();

    expect(ctrl.close).toHaveBeenCalledTimes(2);
  });
});
