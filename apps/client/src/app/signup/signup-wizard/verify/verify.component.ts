import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  reSendEmailVerificationCodeAttempted,
  userVerifyEmailAttempted,
  selectSendSecurityCodeErrors,
  selectSendSecurityCodeLoading,
} from '@conf-match/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cm-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent {
  errors$: Observable<string[]>;
  loading$: Observable<boolean>;
  preLoadCode$ = this.route.queryParamMap.pipe(map((paramMap) => paramMap.get('code')));

  constructor(private _store: Store, private route: ActivatedRoute) {
    this.errors$ = this._store.pipe(select(selectSendSecurityCodeErrors));
    this.loading$ = this._store.pipe(select(selectSendSecurityCodeLoading));
  }

  resend() {
    const email = this.route.snapshot.queryParams.email;
    this._store.dispatch(reSendEmailVerificationCodeAttempted({ email }));
  }

  verify({ code }: { code: string }) {
    const email = this.route.snapshot.queryParams.email;
    this._store.dispatch(userVerifyEmailAttempted({ code, email }));
  }
}
