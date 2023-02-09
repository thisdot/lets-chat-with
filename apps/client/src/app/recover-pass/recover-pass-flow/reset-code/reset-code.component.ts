import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ResetPasswordActions, ResetPasswordSelectors } from '@conf-match/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'cm-reset-code',
  template: `<cm-security-code-form
    [invalid]="(errors$ | async)?.length"
    [loading]="loading$ | async"
    (resendCode)="resend()"
    (submitForm)="verify($event)"
  ></cm-security-code-form>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetCodeComponent {
  errors$: Observable<string[]>;
  loading$: Observable<boolean>;

  constructor(private _store: Store) {
    this.errors$ = this._store.select(ResetPasswordSelectors.selectResetPasswordErrors);
    this.loading$ = this._store.select(ResetPasswordSelectors.selectResetPasswordLoading);
  }

  resend() {
    this._store.dispatch(ResetPasswordActions.resendSecurityCodeAttempted());
  }

  verify({ code }: { code: string }) {
    this._store.dispatch(ResetPasswordActions.submitResetPasswordCode({ code }));
  }
}
