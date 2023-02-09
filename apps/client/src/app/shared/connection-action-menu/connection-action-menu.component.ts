import { Component, Inject } from '@angular/core';
import { CM_MODAL_DATA, ModalController, ModalService } from '@conf-match/shared';
import { ReportModalComponent } from '@conf-match/client/conference/report/feature-report-modal';
import { Match } from '@conf-match/api';
import { Store } from '@ngrx/store';
import { MatchesActions } from '@conf-match/client/conference/matches/data-access';

export interface ConnectionActionMenuComponentInput {
  reportedAttendee: Partial<Match>;
  isMatch: boolean;
  conferenceId: string;
}

@Component({
  selector: 'cm-connection-action-menu',
  templateUrl: './connection-action-menu.component.html',
  styleUrls: ['./connection-action-menu.component.scss'],
})
export class ConnectionActionMenuComponent {
  constructor(
    @Inject(CM_MODAL_DATA) public data: ConnectionActionMenuComponentInput,
    private _ctrl: ModalController<void>,
    private _modalService: ModalService,
    private _store: Store
  ) {}

  unmatch() {
    this._store.dispatch(
      MatchesActions.unmatchAttendee({
        matchId: this.data.reportedAttendee.id,
        otherAttendeeId: this.data.reportedAttendee.attendee.id,
        requestingAttendeeId: this.data.reportedAttendee.attendee2Id,
      })
    );
    this._ctrl.close();
  }

  report() {
    this._ctrl.close();
    this._modalService.openDockedModal<
      void,
      { eventId: string; reportingAttendeeId: string; reportedAttendeeId: string }
    >(
      ReportModalComponent,
      {
        eventId: this.data.conferenceId,
        reportingAttendeeId: this.data.reportedAttendee.attendee1Id,
        reportedAttendeeId: this.data.reportedAttendee.attendee2Id,
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
  }
}
