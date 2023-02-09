import { Component, Inject, HostListener } from '@angular/core';
import { CM_MODAL_DATA, ModalController } from '@conf-match/shared';
import { ReportModalStore } from '@conf-match/client/conference/report/data-access';
import { CreateReportInput as ReportModalData } from '@conf-match/api';
import { MatchesActions } from '@conf-match/client/conference/matches/data-access';
import { Store } from '@ngrx/store';

@Component({
  selector: 'cm-report-modal',
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.scss'],
  providers: [ReportModalStore],
})
export class ReportModalComponent {
  // Must be true, in order to Successfully open the modal
  private _clickFlag = true;

  readonly isReasonsView$ = this.componentStore.isReasonsView$;
  readonly isOtherReasonsView$ = this.componentStore.isOtherReasonsView$;
  readonly isSuccessMessageView$ = this.componentStore.isSuccessMessageView$;

  constructor(
    @Inject(CM_MODAL_DATA) public data: Partial<ReportModalData>,
    private _ctrl: ModalController<void>,
    private componentStore: ReportModalStore,
    private mainStore: Store
  ) {}

  onBack(): void {
    this.componentStore.onBack();
  }

  onDone() {
    this._ctrl.close();
  }

  onClose() {
    this._ctrl.close();
  }

  goToOtherReasons() {
    this.componentStore.goToOtherReasonsView();
  }

  onSend(reportInfo: Partial<ReportModalData>): void {
    this.componentStore.reportUser({
      ...reportInfo,
      eventId: this.data.eventId,
      reportingAttendeeId: this.data.reportingAttendeeId,
      reportedAttendeeId: this.data.reportedAttendeeId,
    } as ReportModalData);

    // If the attendee is reported, then there is no sense of having it as a match - so we're disliking the candidate
    const matchId = this.data.id as string;
    this.mainStore.dispatch(
      MatchesActions.unmatchAttendee({
        matchId,
        otherAttendeeId: this.data.reportedAttendeeId as string,
        requestingAttendeeId: this.data.reportingAttendeeId as string,
      })
    );
  }

  @HostListener('document:click')
  onDocumentClick() {
    if (!this._clickFlag) {
      this._ctrl.close();
    }
    this._clickFlag = false;
  }

  @HostListener('click')
  onComponentClick() {
    this._clickFlag = true;
  }
}
