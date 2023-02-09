import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  conferenceJoinAttempted,
  conferenceQrScanAllowCamera,
  conferenceQrScanFailure,
  CoreState,
} from '@conf-match/core';
import { Store } from '@ngrx/store';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import {
  delay,
  distinctUntilChanged,
  filter,
  map,
  pluck,
  shareReplay,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { LayoutActionsService } from '../../layout/layout-actions.service';

@Component({
  selector: 'cm-qr-scan',
  templateUrl: './qr-scan.component.html',
  styleUrls: ['./qr-scan.component.scss'],
})
export class QrScanComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  /**
   * Hack for asking permissions first. If NgAfterViewInit is used, the scanner throws an error and
   * a very ugly hack is needed to be used to restart the whole qrScanner. This way it starts only when
   * permission is set.
   */
  readonly startCamera$: Observable<boolean> = from(
    new ZXingScannerComponent().askForPermission()
  ).pipe(
    tap(
      (hasPermission: boolean) =>
        hasPermission || this.store.dispatch(conferenceQrScanAllowCamera())
    ),
    shareReplay(1)
  );

  readonly devices = new BehaviorSubject<MediaDeviceInfo[]>([]);
  readonly scanResult = new Subject<string>();
  readonly successfulScan$ = this.scanResult.asObservable().pipe(
    distinctUntilChanged(),
    map((result: string) =>
      result.includes('conferences/read-qr?domain=') ? result.split('read-qr?domain=')[1] : result
    ),
    shareReplay(1)
  );
  readonly devices$ = this.devices.asObservable();
  readonly selectedDevice$ = this.devices$.pipe(pluck(0), filter(Boolean));
  readonly enable$ = this.devices$.pipe(pluck(0), map(Boolean));

  constructor(
    private router: Router,
    private store: Store<CoreState>,
    private layoutActionsService: LayoutActionsService
  ) {}

  ngOnInit(): void {
    this.layoutActionsService.back$
      .pipe(
        delay(500),
        tap((_) => void this.router.navigate(['../'])),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.successfulScan$
      .pipe(
        filter<string>(Boolean),
        tap((domain) => this.store.dispatch(conferenceJoinAttempted({ letsChatWithUrl: domain }))),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleCamera() {
    const [first, ...rest] = this.devices.getValue();
    if (rest) {
      this.devices.next([...rest, first]);
    }
  }

  scanError(e) {
    this.store.dispatch(conferenceQrScanFailure());
  }
}
