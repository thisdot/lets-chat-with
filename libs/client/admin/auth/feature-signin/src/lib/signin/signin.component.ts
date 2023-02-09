import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Router } from '@angular/router';
import { AuthFormInput } from '@conf-match/client/shared/auth/ui-auth-form';
import { SignInActions, AuthSelectors } from '@conf-match/client/admin/auth/data-access';

@Component({
  selector: 'cm-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  loading$ = this._store.pipe(select(AuthSelectors.selectIsLoading));
  skipLinkPath: string;

  constructor(private _store: Store, private router: Router) {
    const url = this.router.url;
    if (url.indexOf('#maincontent') !== -1) {
      this.skipLinkPath = url;
    } else {
      this.skipLinkPath = `${this.router.url}#maincontent`;
    }
  }

  @HostBinding('class.cm-main')
  get defaultClass() {
    return true;
  }

  onSubmit(values: AuthFormInput) {
    this._store.dispatch(
      SignInActions.userSignInAttempted({
        email: values.email,
        password: values.password,
      })
    );
  }
}
