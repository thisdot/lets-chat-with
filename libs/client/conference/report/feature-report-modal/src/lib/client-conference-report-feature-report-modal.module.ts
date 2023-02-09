import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportModalComponent } from './report-modal/report-modal.component';
import { ReasonsComponent } from './report-modal/reasons/reasons.component';
import { OtherReasonComponent } from './report-modal/other-reason/other-reason.component';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from '@conf-match/shared';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, TranslocoModule, SharedModule, SharedUiIconsModule, ReactiveFormsModule],
  declarations: [ReportModalComponent, ReasonsComponent, OtherReasonComponent],
  exports: [ReportModalComponent],
})
export class ClientConferenceReportFeatureReportModalModule {}
