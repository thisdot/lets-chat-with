import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { ReportViewState, ReportView } from '@conf-match/client/conference/report/domain';
import { Observable } from 'rxjs';
import { tap, concatMap, withLatestFrom, switchMap } from 'rxjs/operators';
import { NotificationService, NotificationType } from '@conf-match/shared/ui-notifications';
import { ModalController } from '@conf-match/shared';
import {
  CreateReportGQL,
  CreateReportInput as ReportModalData,
  ReportStatus,
} from '@conf-match/api';
import { Store } from '@ngrx/store';
import { selectOwnerId } from '@conf-match/core';

export interface ReportState {
  status: ReportViewState;
}

export const initialState: ReportState = { status: ReportViewState.Options };

@Injectable({ providedIn: 'root' })
export class ReportModalStore extends ComponentStore<ReportState> {
  constructor(
    private readonly createReportGQL: CreateReportGQL,
    private _ctrl: ModalController<void>,
    private notificationService: NotificationService,
    private _store: Store<any>
  ) {
    super(initialState);
  }
  // Selectors
  readonly reportStatus$: Observable<ReportViewState> = this.select((state) => state.status);

  readonly activeView$: Observable<ReportView> = this.select(this.reportStatus$, (status) => {
    switch (status) {
      case ReportViewState.Options:
        return ReportView.Reasons;
      case ReportViewState.Other:
        return ReportView.OtherReason;
      case ReportViewState.Success:
        return ReportView.SuccessMessage;
      default:
        return ReportView.Reasons;
    }
  });

  readonly isReasonsView$: Observable<boolean> = this.select(
    this.activeView$,
    (activeView) => activeView === ReportView.Reasons
  );

  readonly isOtherReasonsView$: Observable<boolean> = this.select(
    this.activeView$,
    (activeView) => activeView === ReportView.OtherReason
  );

  readonly isSuccessMessageView$: Observable<boolean> = this.select(
    this.activeView$,
    (activeView) => activeView === ReportView.SuccessMessage
  );

  // Updaters
  goToOtherReasonsView = this.updater(() => ({ status: ReportViewState.Other }));

  // Effects
  readonly reportUser = this.effect((reportData$: Observable<ReportModalData>) =>
    reportData$.pipe(
      withLatestFrom(this._store.select(selectOwnerId)),
      switchMap(([reportData, ownerId]) =>
        this.createReportGQL
          .mutate({
            input: {
              eventId: reportData.eventId,
              owner: ownerId,
              reportingAttendeeId: reportData.reportingAttendeeId,
              reportedAttendeeId: reportData.reportedAttendeeId,
              reason: reportData.reason,
              message: reportData.message,
              status: ReportStatus.SUBMITTED,
            },
          })
          .pipe(
            tapResponse(
              () => this.patchState({ status: ReportViewState.Success }),
              () => {
                this.patchState({ status: ReportViewState.Failure });
                this.notificationService.createNotification({
                  type: NotificationType.ServerError,
                  title: `Failed to report user`,
                  message: 'Please contact the administrator ',
                });
              }
            )
          )
      )
    )
  );

  readonly onBack = this.effect((trigger$) =>
    trigger$.pipe(
      concatMap(() => this.activeView$),
      tap({
        next: (activeView) => {
          switch (activeView) {
            case ReportView.OtherReason:
              this.patchState({ status: ReportViewState.Options });
              break;
            default:
              this._ctrl.close();
              break;
          }
        },
      })
    )
  );
}
