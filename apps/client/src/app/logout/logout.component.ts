import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { userSignOutAttempted } from '@conf-match/core';

@Component({
  selector: 'cm-logout',
  template: 'logging out...',
})
export class LogoutComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(userSignOutAttempted({ route: ['/'] }));
  }
}
