import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { passwordChanged } from '../state/settings.actions';

@Component({
  selector: 'cm-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit {
  form: UntypedFormGroup;
  submitted = false;

  constructor(
    private _router: Router,
    private _fb: UntypedFormBuilder,
    private _store: Store<any>
  ) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      const { oldPassword, newPassword } = this.form.value;

      this._store.dispatch(
        passwordChanged({
          oldPassword,
          newPassword,
        })
      );
    }
  }

  onBack(): void {
    this._router.navigate(['settings']);
  }
}
