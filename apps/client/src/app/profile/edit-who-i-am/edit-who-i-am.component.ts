import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AttendeeModel,
  IdentifierModel,
  mapAttendeeToAttendeeModel,
  mapEventIdentifiersToIdentifierModels,
} from '@conf-match/api';
import {
  editingOwnIdentifiersSaved,
  selectAttendee,
  selectConferenceConnections,
  selectMaximumIdentifiers,
} from '@conf-match/core';
import { ModalController } from '@conf-match/shared';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { switchMap, take, tap, map } from 'rxjs/operators';

@Component({
  selector: 'cm-edit-who-i-am',
  templateUrl: './edit-who-i-am.component.html',
  styleUrls: ['./edit-who-i-am.component.scss'],
})
export class EditWhoIAmComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  readonly saveAction = new Subject<void>();

  availableIdentifiers$ = this.store
    .select(selectConferenceConnections)
    .pipe(map(mapEventIdentifiersToIdentifierModels));

  attendee$ = this.store.select(selectAttendee).pipe(map(mapAttendeeToAttendeeModel));

  identifiersCount$ = this.store.pipe(select(selectMaximumIdentifiers));

  selectedIdentifiers: IdentifierModel[] = [];

  constructor(private store: Store<any>, private ctrl: ModalController<any>) {}

  ngOnInit(): void {
    this.saveAction
      .asObservable()
      .pipe(
        take(1),
        switchMap((_) => this.attendee$.pipe(take(1))),
        tap(this.onSave.bind(this))
      )
      .subscribe();
  }

  onIdentifiersSelected(identifiers: IdentifierModel[]) {
    this.selectedIdentifiers = identifiers;
  }

  onSave(attendee: AttendeeModel) {
    this.store.dispatch(
      editingOwnIdentifiersSaved({
        attendeeId: attendee.id,
        ownIdentifiers: this.selectedIdentifiers,
      })
    );
    this.ctrl.close();
  }

  onClose(): void {
    this.ctrl.close();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
