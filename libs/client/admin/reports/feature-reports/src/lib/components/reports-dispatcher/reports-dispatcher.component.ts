import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { selectConferenceId } from '@conf-match/client/admin/core/state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'cm-reports-dispatcher',
  template: ``,
})
export class ReportsDispatcherComponent {
  constructor(private store: Store, private router: Router) {
    this.store.select(selectConferenceId).subscribe((confId) => {
      this.router.navigate(['reports', confId]);
    });
  }
}
