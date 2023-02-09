import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Attendee,
  IdentifierModel,
  mapAttendeeToAttendeeModel,
  mapEventIdentifiersToIdentifierModels,
} from '@conf-match/api';
import {
  editingDesiredIdentifiersSaved,
  selectAttendee,
  selectConferenceConnections,
  selectMaximumIdentifiers,
} from '@conf-match/core';
import { ModalController } from '@conf-match/shared';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'cm-edit-connections',
  templateUrl: './edit-connections.component.html',
  styleUrls: ['./edit-connections.component.scss'],
})
export class EditConnectionsComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
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
        takeUntil(this.destroy$),
        switchMap((_) => this.attendee$.pipe(take(1))),
        tap(this.onSave.bind(this))
      )
      .subscribe();
  }

  onIdentifiersSelected(identifiers: IdentifierModel[]) {
    this.selectedIdentifiers = identifiers;
  }

  onSave(attendee: Attendee) {
    this.store.dispatch(
      editingDesiredIdentifiersSaved({
        attendeeId: attendee.id,
        desiredIdentifiers: this.selectedIdentifiers,
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
