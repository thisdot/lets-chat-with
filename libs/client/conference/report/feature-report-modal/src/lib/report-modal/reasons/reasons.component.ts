import { Component, HostBinding, Output, EventEmitter } from '@angular/core';
import { CreateReportInput as ReportModalData, ReportReason } from '@conf-match/api';

@Component({
  selector: 'cm-reasons',
  templateUrl: './reasons.component.html',
  styleUrls: ['./reasons.component.scss'],
})
export class ReasonsComponent {
  ReportReason = ReportReason;
  @Output() send = new EventEmitter<Partial<ReportModalData>>();
  @Output() otherReasonSelected = new EventEmitter<void>();

  @HostBinding('class.cm-reasons')
  get defaultClass() {
    return true;
  }

  reportFor(reason: ReportReason) {
    this.send.emit({ reason });
  }

  selectOtherReason() {
    this.otherReasonSelected.emit();
  }
}
