import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { WizardComponent } from '../../../shared/wizard/wizard.component';
import { matchControlValidator } from '@conf-match/shared';
import { selectChangePasswordLoading, ResetPasswordActions } from '@conf-match/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';

export interface FormInput {
  newPassword: string;
  confirmPassword: string;
}

@Component({
  selector: 'cm-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
})
export class NewPasswordComponent {
  form: UntypedFormGroup;
  loading$: Observable<boolean>;
  private readonly minPasswordLength: number = 8;

  constructor(
    private _store: Store<{}>,
    formBuilder: UntypedFormBuilder,
    private transloco: TranslocoService
  ) {
    this.loading$ = this._store.select(selectChangePasswordLoading);

    this.form = formBuilder.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(this.minPasswordLength)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [matchControlValidator('newPassword', 'confirmPassword')],
      }
    );
  }

  get newPasswordErrors(): string[] {
    return Object.keys(this.form.controls['newPassword'].errors || {})
      .map((key: string) => {
        if (key === 'minlength' && this.form.controls['newPassword'].value) {
          return this.transloco.translate('resetPassword.newPassword.passwordNotLongEnough', {
            minPasswordLength: this.minPasswordLength,
          });
        }
      })
      .filter((e) => !!e);
  }

  get confirmPasswordErrors() {
    return Object.keys(this.form.errors || {})
      .map((key: string) => {
        if (key === 'notMatching' && this.form.controls['confirmPassword'].value) {
          return this.transloco.translate('resetPassword.newPassword.passwordsMatchError');
        }
      })
      .filter((e) => !!e);
  }

  onSubmit(form: FormInput) {
    this._store.dispatch(
      ResetPasswordActions.changePasswordAttempted({
        password: form.newPassword,
      })
    );
  }
}
