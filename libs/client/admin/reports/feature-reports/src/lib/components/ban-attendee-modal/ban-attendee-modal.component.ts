import { Component, Inject } from '@angular/core';
import { BanAttendee, ReportReason } from '../../interfaces/reports.interfaces';
import { CM_MODAL_DATA, ModalController } from '@conf-match/shared';
import { Subject } from 'rxjs';
import { BAN_SUBJECT_TOKEN } from '../../tokens/injection.tokens';

type ModalState = 'REASON_SELECTION' | 'NOTE_INPUT';

export interface BanAttendeeModalData {
  reportId: string;
  eventId: string;
  attendeeId: string;
}

@Component({
  selector: 'cm-ban-attendee-modal',
  templateUrl: './ban-attendee-modal.component.html',
  styleUrls: ['./ban-attendee-modal.component.scss'],
})
export class BanAttendeeModalComponent {
  banAttendeeData: BanAttendeeModalData;

  modalState: ModalState = 'REASON_SELECTION';

  selectedReason: ReportReason | null = null;

  constructor(
    @Inject(CM_MODAL_DATA) banAttendeeData: BanAttendeeModalData,
    @Inject(BAN_SUBJECT_TOKEN) private banSubject: Subject<BanAttendee>,
    private modalController: ModalController<BanAttendeeModalComponent>
  ) {
    this.banAttendeeData = banAttendeeData;
  }

  onClickOption(reportReason: ReportReason) {
    this.selectedReason = reportReason;
    if (reportReason === 'OTHER') {
      this.modalState = 'NOTE_INPUT';
    } else {
      this.submitBan({ ...this.banAttendeeData, reportReason });
    }
  }

  onSubmitNote(note: string) {
    if (this.selectedReason) {
      this.submitBan({
        ...this.banAttendeeData,
        reportReason: this.selectedReason,
        note,
      });
    }
  }

  private submitBan(ban: BanAttendee) {
    this.banSubject.next(ban);
    this.closeModal();
  }

  closeModal() {
    this.modalController.close();
  }
}
