import { Injectable } from '@angular/core';
import { map, retry, switchMap, take } from 'rxjs/operators';
import {
  ApiReport,
  AttendeeModel,
  GetAttendeeGQL,
  ListReportsGQL,
  UpdateReportGQL,
  mapAttendeeToAttendeeModel,
  ReportStatus,
} from '@conf-match/api';
import { BanAttendee, DismissAttendee, ReportedAttendee } from '../interfaces/reports.interfaces';
import { Observable } from 'rxjs';
import { AuthService } from '@conf-match/core';
import { ExecutionResult } from 'apollo-link';

@Injectable({
  providedIn: 'root',
})
export class ReportsDataService {
  constructor(
    private readonly listReportsGql: ListReportsGQL,
    private readonly getAttendeeGql: GetAttendeeGQL,
    private readonly updateReportGql: UpdateReportGQL,
    private authService: AuthService
  ) {}

  getReports(
    reportStatus: ReportStatus,
    eventId: string,
    ignoreSpinner: boolean = false
  ): Observable<ReportedAttendee[]> {
    // We're getting the authenticated user to make sure we're authenticated before fetching
    return this.authService.getCurrentUser().pipe(
      take(1),
      switchMap(() =>
        this.listReportsGql.fetch(
          {
            reportStatus,
            eventId,
          },
          {
            fetchPolicy: 'network-only',
            context: {
              ignoreSpinner,
            },
          }
        )
      ),
      map((listReportsResponse) =>
        listReportsResponse.data.listReports.items.map(
          (reportItem: ApiReport) =>
            ({
              attendeeId: reportItem?.reportedAttendee?.id,
              fullName: reportItem?.reportedAttendee?.fullName,
              avatarUrl: reportItem?.reportedAttendee?.avatarUrl,
              title: reportItem?.reportedAttendee?.title,
              note: reportItem.message,
              reportReason: reportItem.reason,
              status: reportItem?.status,
              reportingAttendee: {
                attendeeId: reportItem?.reportingAttendee?.id,
                fullName: reportItem?.reportingAttendee?.fullName,
                avatarUrl: reportItem?.reportingAttendee?.avatarUrl,
              },
              eventId: reportItem?.eventId,
              reportId: reportItem?.id,
            } as ReportedAttendee)
        )
      )
    );
  }

  changeUserStatus(attendee: BanAttendee | DismissAttendee, status: ReportStatus) {
    return this.updateReportGql
      .mutate({
        input: {
          id: attendee.reportId,
          eventId: attendee.eventId,
          status: status,
          message: attendee.note,
        },
      })
      .pipe(
        retry(3),
        map((result: ExecutionResult<{ updateReport: ApiReport }>) => result.data?.updateReport)
      );
  }

  getAttendeeById(attendeeId: string): Observable<AttendeeModel> {
    return this.getAttendeeGql
      .fetch({
        id: attendeeId,
      })
      .pipe(map((result) => mapAttendeeToAttendeeModel(result?.data?.getAttendee)));
  }
}
