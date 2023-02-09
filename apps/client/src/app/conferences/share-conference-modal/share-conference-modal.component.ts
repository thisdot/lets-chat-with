import { Component, Inject, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { selectConference, selectConferenceShareData } from '@conf-match/core';
import { ModalController } from '@conf-match/shared';
import { NotificationService, NotificationType } from '@conf-match/shared/ui-notifications';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { from, iif, Observable, of } from 'rxjs';
import { catchError, filter, map, pluck, shareReplay, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'cm-join-conference-modal',
  templateUrl: './share-conference-modal.component.html',
  styleUrls: ['./share-conference-modal.component.scss'],
})
export class ShareConferenceModalComponent {
  private readonly conferenceShareData$ = this.store.select(selectConferenceShareData);
  readonly qrUrl$ = this.conferenceShareData$.pipe(pluck('qrImageUrl'));

  constructor(
    private store: Store<any>,
    private _ctrl: ModalController<any>,
    private notifications: NotificationService,
    private translate: TranslocoService
  ) {}

  share(): void {
    this.conferenceShareData$
      .pipe(
        take(1),
        pluck('shareUrl'),
        switchMap((shareUrl: string) =>
          iif(() => !!navigator.share, this.nativeShare(shareUrl), this.copyToClipboard(shareUrl))
        )
      )
      .subscribe();
  }

  private nativeShare(shareUrl): Observable<void> {
    return of(!!navigator.share).pipe(
      filter(Boolean),
      switchMap(() =>
        from(
          navigator.share({
            title: `Let's Chat With`,
            text: 'Join conference share',
            url: shareUrl,
          })
        )
      )
    );
  }

  private copyToClipboard(shareUrl): Observable<void> {
    // @ts-ignore
    return from(navigator.permissions.query({ name: 'clipboard-write' })).pipe(
      filter((result: PermissionStatus) => result.state === 'granted' || result.state === 'prompt'),
      switchMap(() => from(navigator.clipboard.writeText(shareUrl))),
      switchMap(() => {
        const notification = this.notifications.createNotification({
          type: NotificationType.Success,
          title: this.translate.translate('conferences.share.modal.notification.title'),
          message: this.translate.translate('conferences.share.modal.notification.message'),
          ttl: 3000,
        });
        return notification.closed.pipe(map(() => null));
      }),
      catchError((error) => {
        const notification = this.notifications.createNotification({
          type: NotificationType.Success,
          title: this.translate.translate('conferences.share.modal.notification.errorTitle'),
          message: this.translate.translate('conferences.share.modal.notification.errorMessage'),
          ttl: 3000,
        });
        return notification.closed.pipe(map(() => null));
      })
    );
  }
}
