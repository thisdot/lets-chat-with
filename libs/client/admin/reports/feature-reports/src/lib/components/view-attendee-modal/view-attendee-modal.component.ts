import { Component, Inject } from '@angular/core';
import { CM_MODAL_DATA, ModalController } from '@conf-match/shared';
import { AttendeeModel } from '@conf-match/api';

export interface ViewAttendeeModalData {
  attendee: AttendeeModel;
}

@Component({
  selector: 'cm-view-attendee-modal',
  templateUrl: './view-attendee-modal.component.html',
  styleUrls: ['./view-attendee-modal.component.scss'],
})
export class ViewAttendeeModalComponent {
  attendee: AttendeeModel;

  constructor(
    @Inject(CM_MODAL_DATA) { attendee }: ViewAttendeeModalData,
    private modalController: ModalController<ViewAttendeeModalComponent>
  ) {
    this.attendee = attendee;
  }

  closeModal() {
    this.modalController.close();
  }
}
