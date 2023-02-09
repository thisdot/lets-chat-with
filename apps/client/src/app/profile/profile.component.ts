import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mapAttendeeToAttendeeModel } from '@conf-match/api';
import { profileOpened, selectAttendee } from '@conf-match/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cm-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  readonly attendee$ = this._store.select(selectAttendee).pipe(map(mapAttendeeToAttendeeModel));

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _store: Store<any>
  ) {}

  ngOnInit(): void {
    this._store.dispatch(profileOpened());
  }

  onEdit() {
    this._router.navigate(['./edit'], { relativeTo: this._activatedRoute });
  }
}
