import { Component, Inject, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject, timer } from 'rxjs';
import {
  BanAttendee,
  DismissAttendee,
  ReportedAttendee,
} from '../../interfaces/reports.interfaces';
import { DockedModalConfig, ModalService } from '@conf-match/shared';
import {
  BanAttendeeModalComponent,
  BanAttendeeModalData,
} from '../ban-attendee-modal/ban-attendee-modal.component';
import { catchError, exhaustMap, switchMap, takeUntil } from 'rxjs/operators';
import { BAN_SUBJECT_TOKEN, DISMISS_SUBJECT_TOKEN } from '../../tokens/injection.tokens';
import {
  DismissAttendeeModalComponent,
  DismissAttendeeModalData,
} from '../dismiss-attendee-modal/dismiss-attendee-modal.component';
import {
  ViewAttendeeModalComponent,
  ViewAttendeeModalData,
} from '../view-attendee-modal/view-attendee-modal.component';
import { ReportsDataService } from '../../services/reports-data.service';
import { ReportStatus } from '@conf-match/api';
import { Store } from '@ngrx/store';
import { selectConferenceId } from '@conf-match/client/admin/core/state';
import { NotificationService, NotificationType } from '@conf-match/shared/ui-notifications';

const MODAL_CONFIG: DockedModalConfig = {
  direction: 'right',
  resizeable: false,
  closeButton: false,
  closeIcon: false,
  removeSpacing: true,
  rounded: false,
};

@Component({
  selector: 'cm-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss'],
})
export class ReportsListComponent implements OnDestroy {
  reportedAttendees: ReportedAttendee[] | null = null;

  ReportStatus = ReportStatus;

  ban$: Observable<BanAttendee>;

  dismiss$: Observable<DismissAttendee>;

  readonly reportStatusSubject = new BehaviorSubject<ReportStatus>(ReportStatus.SUBMITTED);

  readonly reportStatus$ = this.reportStatusSubject.asObservable();

  readonly destroySubject = new Subject<void>();

  isLoading = false;

  reports$ = combineLatest([this.reportStatus$, this.store.select(selectConferenceId)]).pipe(
    takeUntil(this.destroySubject),
    switchMap(([reportStatus, conferenceId]) => {
      this.isLoading = true;

      // We need to keep refreshing the list
      return timer(0, 5000).pipe(
        exhaustMap((countValue) =>
          this.reportsDataService.getReports(
            reportStatus,
            conferenceId,
            countValue > 0 // Do not show the spinner after initial load
          )
        )
      );
    })
  );

  constructor(
    private modalService: ModalService,
    @Inject(BAN_SUBJECT_TOKEN) banSubject: Subject<BanAttendee>,
    @Inject(DISMISS_SUBJECT_TOKEN) dismissSubject: Subject<DismissAttendee>,
    private readonly reportsDataService: ReportsDataService,
    private notificationService: NotificationService,
    private readonly store: Store
  ) {
    this.ban$ = banSubject.asObservable();
    this.dismiss$ = dismissSubject.asObservable();

    this.ban$.pipe(takeUntil(this.destroySubject)).subscribe((newBan) => {
      this.reportsDataService
        .changeUserStatus(newBan, ReportStatus.BANNED)
        .pipe(
          takeUntil(this.destroySubject),
          switchMap((res) =>
            this.updateNotification(
              `${res?.reportedAttendee?.fullName} has been ${ReportStatus.BANNED.toLowerCase()}`,
              NotificationType.Success
            )
          ),
          catchError(() =>
            this.updateNotification('Error banning user', NotificationType.ServerError)
          )
        )
        .subscribe();
    });

    this.dismiss$.pipe(takeUntil(this.destroySubject)).subscribe((newDismiss) => {
      this.reportsDataService
        .changeUserStatus(newDismiss, ReportStatus.DISMISSED)
        .pipe(
          takeUntil(this.destroySubject),
          switchMap((res) =>
            this.updateNotification(
              `${res?.reportedAttendee?.fullName} has been ${ReportStatus.DISMISSED.toLowerCase()}`,
              NotificationType.Success
            )
          ),
          catchError(() =>
            this.updateNotification('Error dismissing user', NotificationType.ServerError)
          )
        )
        .subscribe();
    });

    this.reports$.subscribe((reports) => {
      this.reportedAttendees = reports;
      this.isLoading = false;
    });
  }

  @Input() set reportStatusFilter(reportStatus: ReportStatus) {
    this.reportStatusSubject.next(reportStatus);
  }

  ngOnDestroy() {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  updateNotification(title: string, type: NotificationType) {
    return this.notificationService.createNotification$(
      {
        type,
        title,
        closeable: true,
        ttl: 3000,
      },
      false
    );
  }

  onPressBan({ eventId, reportId, attendeeId }: ReportedAttendee) {
    this.modalService.openDockedModal(
      BanAttendeeModalComponent,
      {
        eventId,
        reportId,
        attendeeId,
      } as BanAttendeeModalData,
      MODAL_CONFIG
    );
  }

  onPressDismiss({ eventId, reportId, attendeeId }: ReportedAttendee) {
    this.modalService.openDockedModal(
      DismissAttendeeModalComponent,
      {
        eventId,
        reportId,
        attendeeId,
      } as DismissAttendeeModalData,
      MODAL_CONFIG
    );
  }

  onPressRevoke({ eventId, reportId, attendeeId }: ReportedAttendee) {
    this.reportsDataService
      .changeUserStatus(
        {
          eventId,
          reportId,
          attendeeId,
        },
        ReportStatus.SUBMITTED
      )
      .pipe(
        takeUntil(this.destroySubject),
        switchMap((res) =>
          this.updateNotification(
            `${res?.reportedAttendee?.fullName}'s ban has been revoked`,
            NotificationType.Success
          )
        ),
        catchError(() =>
          this.updateNotification('Error banning user', NotificationType.ServerError)
        )
      )
      .subscribe();
  }

  onPressViewAttendee(attendeeId: string) {
    this.reportsDataService.getAttendeeById(attendeeId).subscribe((attendee) => {
      this.modalService.openDockedModal(
        ViewAttendeeModalComponent,
        { attendee } as ViewAttendeeModalData,
        MODAL_CONFIG
      );
    });
  }
}
