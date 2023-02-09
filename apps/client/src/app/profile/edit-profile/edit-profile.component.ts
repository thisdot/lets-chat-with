import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, UntypedFormBuilder } from '@angular/forms';
import { AttendeeModel, UpdateAttendeeInput } from '@conf-match/api';
import { savingProfileStarted, selectAttendee } from '@conf-match/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { tap, map, takeUntil } from 'rxjs/operators';
import { ModalService, DockedModalConfig } from '@conf-match/shared';
import { EditConnectionsComponent } from '../edit-connections/edit-connections.component';
import { EditInterestsComponent } from '../edit-interests/edit-interests.component';
import { EditWhoIAmComponent } from '../edit-who-i-am/edit-who-i-am.component';
import { mapAttendeeToAttendeeModel } from '@conf-match/api';

const DEFAULT_DOCKED_MODAL_CONFIG: DockedModalConfig = {
  direction: 'right',
  resizeable: false,
  closeButton: false,
  closeIcon: false,
  removeSpacing: true,
  rounded: false,
};

@Component({
  selector: 'cm-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  readonly saveAction = new Subject<void>();

  form = this.formBuilder.group({
    id: '',
    fullName: ['', Validators.required],
    avatarUrl: '',
    title: '',
    company: '',
    pronouns: '',
    bio: '',
    linkedin: '',
    twitter: '',
    facebook: '',
  });
  readonly attendee$: Observable<AttendeeModel> = this.store.pipe(
    select(selectAttendee),
    map(mapAttendeeToAttendeeModel),
    tap((attendee: AttendeeModel) => this.form.patchValue(attendee))
  );

  constructor(
    private formBuilder: UntypedFormBuilder,
    private store: Store<any>,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.saveAction
      .asObservable()
      .pipe(
        takeUntil(this.destroy$),
        map(() => this.form.getRawValue()),
        tap((value) => this.onSave(value))
      )
      .subscribe();
  }

  onSave(input: UpdateAttendeeInput) {
    this.store.dispatch(
      savingProfileStarted({
        input,
      })
    );
  }

  editConnections() {
    this.modalService.openDockedModal(EditConnectionsComponent, null, DEFAULT_DOCKED_MODAL_CONFIG);
  }

  editIdentifiers() {
    this.modalService.openDockedModal(EditWhoIAmComponent, null, DEFAULT_DOCKED_MODAL_CONFIG);
  }

  editInterests() {
    this.modalService.openDockedModal(EditInterestsComponent, null, DEFAULT_DOCKED_MODAL_CONFIG);
  }

  updateAvatarUrl(avatarUrl: string): void {
    this.form.patchValue({
      avatarUrl,
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
