import { Component, Output, EventEmitter, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

const MinPasswordLength = 8;

export interface AuthFormInput {
  email: string;
  password: string;
}

@Component({
  selector: 'cm-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent {
  form: UntypedFormGroup;
  @Input() loading = false;
  @Input() buttonLabel = 'Sign In';
  @Input() page: 'signin' | 'signup' = 'signup';
  @Output() submitForm = new EventEmitter<AuthFormInput>();

  constructor(private _formBuilder: UntypedFormBuilder) {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(MinPasswordLength)]],
    });
  }

  onSubmit(value: AuthFormInput) {
    if (this.form.invalid) return;

    this.submitForm.emit(value);
  }
}
