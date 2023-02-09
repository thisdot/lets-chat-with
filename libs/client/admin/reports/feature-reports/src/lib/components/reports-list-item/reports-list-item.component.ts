import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ReportedAttendee } from '../../interfaces/reports.interfaces';
import { ReportStatus } from '@conf-match/api';

@Component({
  selector: 'cm-reports-list-item',
  templateUrl: './reports-list-item.component.html',
  styleUrls: ['./reports-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsListItemComponent {
  ReportStatus = ReportStatus;

  @Input()
  reportedAttendee!: ReportedAttendee;

  @Output()
  ban = new EventEmitter<ReportedAttendee>();

  @Output()
  dismiss = new EventEmitter<ReportedAttendee>();

  @Output()
  revoke = new EventEmitter<ReportedAttendee>();

  @Output()
  viewAttendee = new EventEmitter<string>();
}
