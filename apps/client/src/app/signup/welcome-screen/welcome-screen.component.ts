import { Component, HostBinding } from '@angular/core';
import { userSignUpAttempted, selectAuthLoading, selectAuthErrors } from '@conf-match/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthFormInput } from '@conf-match/client/shared/auth/ui-auth-form';

@Component({
  selector: 'cm-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.scss'],
})
export class WelcomeScreenComponent {
  errors$: Observable<string[]>;
  loading$: Observable<boolean>;

  constructor(private _store: Store<{}>) {
    this.errors$ = this._store.select(selectAuthErrors);
    this.loading$ = this._store.select(selectAuthLoading);
  }

  @HostBinding('class.cm-welcome-screen')
  get defaultClass() {
    return true;
  }

  onSubmit(input: AuthFormInput) {
    this._store.dispatch(userSignUpAttempted(input));
  }
}
