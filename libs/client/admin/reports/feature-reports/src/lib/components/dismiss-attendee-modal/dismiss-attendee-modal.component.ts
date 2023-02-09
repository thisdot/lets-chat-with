import { Component, Inject } from '@angular/core';
import { DismissAttendee } from '../../interfaces/reports.interfaces';
import { CM_MODAL_DATA, ModalController } from '@conf-match/shared';
import { DISMISS_SUBJECT_TOKEN } from '../../tokens/injection.tokens';
import { Subject } from 'rxjs';

export interface DismissAttendeeModalData {
  reportId: string;
  eventId: string;
  attendeeId: string;
}

@Component({
  selector: 'cm-dismiss-attendee-modal',
  templateUrl: './dismiss-attendee-modal.component.html',
  styleUrls: ['./dismiss-attendee-modal.component.scss'],
})
export class DismissAttendeeModalComponent {
  dismissAttendeeModalData: DismissAttendeeModalData;

  constructor(
    @Inject(CM_MODAL_DATA) dismissAttendeeModalData: DismissAttendeeModalData,
    @Inject(DISMISS_SUBJECT_TOKEN) private dismissSubject: Subject<DismissAttendee>,
    private modalController: ModalController<DismissAttendeeModalComponent>
  ) {
    this.dismissAttendeeModalData = dismissAttendeeModalData;
  }

  onSubmitNote(note: string) {
    this.submitDismiss({
      ...this.dismissAttendeeModalData,
      note,
    });
  }

  private submitDismiss(dismiss: DismissAttendee) {
    this.dismissSubject.next(dismiss);
    this.closeModal();
  }

  closeModal() {
    this.modalController.close();
  }
}
