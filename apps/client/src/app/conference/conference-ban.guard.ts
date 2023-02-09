import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ReportStatus, UserListReportsGQL } from '@conf-match/api';
import { filter, map, switchMap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { banReportLoaded, selectAttendeeId } from '@conf-match/core';

@Injectable({
  providedIn: 'root',
})
export class ConferenceBanGuard {
  constructor(
    private router: Router,
    private userListReportsGQL: UserListReportsGQL,
    private store: Store<any>
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const finalUrl: UrlTree = this.router.getCurrentNavigation()?.finalUrl;
    const eventId: string = finalUrl?.root.children['primary'].segments[1]?.path;

    return this.store.pipe(
      select(selectAttendeeId), //  get current user id
      switchMap((userId) => this.getAttendeeReports(eventId, userId)), // return reports on this user
      map((report) => {
        if (report) {
          // store report to allow access from the banned page
          this.store.dispatch(banReportLoaded({ report }));
          // if user is banned direct them to the banned page
          return this.router.parseUrl(`/conferences/${eventId}/banned`);
        } else {
          this.store.dispatch(banReportLoaded({ report: null }));
          return true;
        }
      })
    );
  }

  // get list of banned reports on the users
  private getAttendeeReports(eventId, reportedAttendeeId) {
    return this.userListReportsGQL
      .fetch(
        {
          eventId,
          reportedAttendeeId,
        },
        {
          fetchPolicy: 'network-only',
        }
      )
      .pipe(
        filter((res) => !!res.data),
        map((res) => res.data.listReports),
        map((attendees) => attendees.items),
        map((attendees) => attendees.find((item) => item.status === ReportStatus.BANNED))
      );
  }
}
