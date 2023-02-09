import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { selectAppUserNotificationConfig, userNotificationConfigUpdated } from '@conf-match/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'cm-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit, OnDestroy {
  private _onDestroy$ = new Subject<void>();
  form: UntypedFormGroup;

  readonly notificationConfig$ = this.store.select(selectAppUserNotificationConfig).pipe(
    filter(Boolean),
    /** We use "emitEvent: false" to avoid triggering saving when we patch the value.
     * It could cause an infinite loop
     */
    tap((config) => this.form.patchValue(config, { emitEvent: false }))
  );

  constructor(
    private router: Router,
    private store: Store<any>,
    private formBuilder: UntypedFormBuilder
  ) {
    this.form = this.formBuilder.group({
      matches: false,
      messages: false,
      subscribe: false,
    });
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        takeUntil(this._onDestroy$),
        tap((changedConfig) => {
          this.store.dispatch(
            userNotificationConfigUpdated({
              config: { ...changedConfig },
            })
          );
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  onBack() {
    this.router.navigate(['settings']);
  }
}
