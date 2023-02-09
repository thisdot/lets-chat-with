import { Component, HostBinding } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { userSignInAttempted, selectAuthLoading } from '@conf-match/core';
import { AuthFormInput } from '@conf-match/client/shared/auth/ui-auth-form';
import { Router } from '@angular/router';

@Component({
  selector: 'cm-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  loading$ = this._store.pipe(select(selectAuthLoading));
  skipLinkPath: string;

  constructor(private _store: Store<{}>, private router: Router) {
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
      userSignInAttempted({
        email: values.email,
        password: values.password,
      })
    );
  }
}
