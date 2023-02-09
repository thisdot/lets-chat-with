import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { WizardComponent } from '../../../shared/wizard/wizard.component';
import {
  selectSendSecurityCodeLoading,
  selectSendSecurityCodeErrors,
  ResetPasswordActions,
} from '@conf-match/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

export interface FormInput {
  email: string;
}

@Component({
  selector: 'cm-current-email',
  templateUrl: './current-email.component.html',
  styleUrls: ['./current-email.component.scss'],
})
export class CurrentEmailComponent {
  loading$: Observable<boolean>;
  errors$: Observable<string[]>;
  form: UntypedFormGroup;

  constructor(
    private _wizard: WizardComponent<FormInput>,
    private _store: Store<{}>,
    formBuilder: UntypedFormBuilder
  ) {
    this.loading$ = this._store.select(selectSendSecurityCodeLoading);
    this.errors$ = this._store.select(selectSendSecurityCodeErrors);

    const { email } = this._wizard.getData();

    this.form = formBuilder.group({
      email: [email || '', Validators.required],
    });
  }

  onInput(e: InputEvent) {
    if (!(e.target as HTMLInputElement).value.length) {
      this._store.dispatch(ResetPasswordActions.recoverPassEmailInputCleared());
    }
  }

  onNext(form: FormInput) {
    this._wizard.saveData(form);

    this._store.dispatch(
      ResetPasswordActions.sendSecurityCodeAttempted({
        email: form.email,
      })
    );
  }
}
