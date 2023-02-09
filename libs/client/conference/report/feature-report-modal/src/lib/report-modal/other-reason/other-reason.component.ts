import { Component, Output, EventEmitter } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { CreateReportInput as ReportModalData, ReportReason } from '@conf-match/api';

@Component({
  selector: 'cm-other-reason',
  templateUrl: './other-reason.component.html',
  styleUrls: ['./other-reason.component.scss'],
})
export class OtherReasonComponent {
  form: UntypedFormGroup;
  @Output() send = new EventEmitter<Partial<ReportModalData>>();

  constructor(private _formBuilder: UntypedFormBuilder) {
    this.form = this._formBuilder.group({
      message: ['', Validators.required],
    });
  }

  onSubmit({ message }: { message: string }) {
    this.send.emit({
      message,
      reason: ReportReason.OTHER,
    });
  }
}
