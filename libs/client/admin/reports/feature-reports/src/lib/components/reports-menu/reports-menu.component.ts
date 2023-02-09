import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { ReportStatus } from '@conf-match/api';
import { BreakpointObserver } from '@angular/cdk/layout';
import { pluck } from 'rxjs/operators';
import { CmBreakpoints } from '@conf-match/shared';

@Component({
  selector: 'cm-reports-menu',
  templateUrl: './reports-menu.component.html',
  styleUrls: ['./reports-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsMenuComponent {
  selectedStatus = ReportStatus.SUBMITTED;

  ReportStatus = ReportStatus;

  isMobile$ = this.breakpointObserver.observe(CmBreakpoints.MD.DOWN).pipe(pluck('matches'));

  constructor(private breakpointObserver: BreakpointObserver) {}

  @Output()
  selectMenuItem = new EventEmitter<ReportStatus>();

  onSelectItem(selectedItemStatus: ReportStatus) {
    this.selectedStatus = selectedItemStatus;
    this.selectMenuItem.emit(selectedItemStatus);
  }
}
