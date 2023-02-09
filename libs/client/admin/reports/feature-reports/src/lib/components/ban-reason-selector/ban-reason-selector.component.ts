import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { ReportReason } from '../../interfaces/reports.interfaces';

@Component({
  selector: 'cm-ban-reason-selector',
  templateUrl: './ban-reason-selector.component.html',
  styleUrls: ['./ban-reason-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BanReasonSelectorComponent {
  @Output()
  private reasonSelected = new EventEmitter<ReportReason>();

  onClickOption(reportReason: ReportReason) {
    this.reasonSelected.emit(reportReason);
  }
}
