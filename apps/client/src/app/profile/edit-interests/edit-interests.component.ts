import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AttendeeModel,
  InterestModel,
  ListInterestsGQL,
  mapAttendeeToAttendeeModel,
  mapEventInterestsToInterestModels,
} from '@conf-match/api';
import {
  editingInterestsSaved,
  selectAttendee,
  selectConferenceInterests,
  selectMaximumInterests,
} from '@conf-match/core';
import { ModalController } from '@conf-match/shared';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'cm-edit-interests',
  templateUrl: './edit-interests.component.html',
  styleUrls: ['./edit-interests.component.scss'],
})
export class EditInterestsComponent implements OnInit, OnDestroy {
  readonly saveAction = new Subject<void>();

  private readonly destroy$ = new Subject<void>();

  conferenceInterests$: Observable<InterestModel[]> = this._store.pipe(
    select(selectConferenceInterests),
    map(mapEventInterestsToInterestModels)
  );

  attendee$: Observable<AttendeeModel> = this._store.pipe(
    select(selectAttendee),
    map(mapAttendeeToAttendeeModel)
  );

  interestCount$ = this._store.pipe(select(selectMaximumInterests));

  interests$ = combineLatest([
    this._listInterests.fetch({ limit: 100 }),
    this.conferenceInterests$,
  ]).pipe(
    map(([res, conferenceInterests]) => {
      // We need to de-dupe listInterests.items, otherwise
      // duplicates will display in our own list of interests.
      const uniqueInterests = {};
      const listInterests = res.data.listInterests.items.filter((item) => {
        if (uniqueInterests[item.id]) {
          return false;
        }

        uniqueInterests[item.id] = true;
        return true;
      });

      // Now that we've de-duped, ensure our own interest list
      // overlaps with the interest possibilities for the conference itself.
      return listInterests.filter((listInterest) =>
        conferenceInterests.some((i) => i.id === listInterest.id)
      );
    })
  );

  selectedInterests = [];

  constructor(
    private _listInterests: ListInterestsGQL,
    private _store: Store<any>,
    private _ctrl: ModalController<any>
  ) {}

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

  onInterestsSelected(interests) {
    this.selectedInterests = interests;
  }

  private onSave(attendee: AttendeeModel) {
    this._store.dispatch(
      editingInterestsSaved({
        attendeeId: attendee.id,
        interests: this.selectedInterests,
      })
    );
    this._ctrl.close();
  }

  onClose(): void {
    this._ctrl.close();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
