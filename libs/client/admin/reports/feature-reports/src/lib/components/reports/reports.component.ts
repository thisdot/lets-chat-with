import { Component } from '@angular/core';
import { ReportStatus } from '@conf-match/api';

@Component({
  selector: 'cm-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent {
  reportStatus = ReportStatus.SUBMITTED;

  onChangeReportStatus(newReportStatus: ReportStatus) {
    this.reportStatus = newReportStatus;
  }
}
