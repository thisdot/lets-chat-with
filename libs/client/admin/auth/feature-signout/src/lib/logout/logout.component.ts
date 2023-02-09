import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SignOutActions } from '@conf-match/client/admin/auth/data-access';

@Component({
  selector: 'cm-logout',
  template: 'logging out...',
})
export class LogoutComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(SignOutActions.userSignOutAttempted({ route: ['/'] }));
  }
}
