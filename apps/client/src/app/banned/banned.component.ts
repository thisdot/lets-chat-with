import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectReport } from '@conf-match/core';

@Component({
  selector: 'cm-banned',
  templateUrl: './banned.component.html',
  styleUrls: ['./banned.component.scss'],
})
export class BannedComponent {
  report$ = this.store.select(selectReport);

  constructor(private store: Store<any>) {}
}
