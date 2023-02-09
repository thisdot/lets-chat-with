import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { emailChanged, emailChangeVerified } from '../state/settings.actions';

@Component({
  selector: 'cm-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class EmailComponent implements OnInit {
  emailForm: UntypedFormGroup;
  codeForm: UntypedFormGroup;
  submitted = false;

  showEmail = true;

  constructor(
    private _router: Router,
    private _fb: UntypedFormBuilder,
    private _store: Store<any>
  ) {}

  ngOnInit(): void {
    this.emailForm = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
    });

    this.codeForm = this._fb.group({
      code: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  sendVerification() {
    this.submitted = true;
    this.showEmail = false;
    if (this.emailForm.valid) {
      const { email } = this.emailForm.value;
      this._store.dispatch(
        emailChanged({
          email,
        })
      );
    }
  }

  verify(code) {
    this._store.dispatch(
      emailChangeVerified({
        code,
      })
    );
  }

  onBack() {
    if (!this.showEmail) {
      this.showEmail = true;
    } else {
      this._router.navigate(['settings']);
    }
  }
}
