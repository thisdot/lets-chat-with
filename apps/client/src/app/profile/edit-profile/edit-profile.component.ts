import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { AttendeeModel, mapAttendeeToAttendeeModel, UpdateAttendeeInput } from '@conf-match/api';
import { savingProfileStarted, selectAttendee } from '@conf-match/core';
import { CmBreakpoints, DockedModalConfig, ModalService } from '@conf-match/shared';
import { getSocialLink, getSocialProfile } from '@conf-match/utilities';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { EditConnectionsComponent } from '../edit-connections/edit-connections.component';
import { EditInterestsComponent } from '../edit-interests/edit-interests.component';
import { EditWhoIAmComponent } from '../edit-who-i-am/edit-who-i-am.component';

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
  isMobile: boolean = false;
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
    tap((attendee: AttendeeModel) => {
      const socials = this._patchSocialUsernames(attendee);
      this.form.patchValue({ ...attendee, ...socials });
    })
  );

  constructor(
    private formBuilder: UntypedFormBuilder,
    private store: Store<any>,
    private modalService: ModalService,
    private breakpointObserver: BreakpointObserver
  ) {
    breakpointObserver
      .observe(CmBreakpoints.MD.DOWN)
      .pipe(
        takeUntil(this.destroy$),
        map((x) => x?.matches)
      )
      .subscribe((x) => {
        this.isMobile = x;
      });
  }

  ngOnInit(): void {
    this.saveAction
      .asObservable()
      .pipe(
        takeUntil(this.destroy$),
        map(() => this.form.getRawValue()),
        tap((value) => {
          const socials = this._patchSocialURLs(value);
          this.onSave({ ...value, ...socials });
        })
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

  private _patchSocialUsernames(attendee: AttendeeModel) {
    const { linkedin, twitter, facebook } = attendee;
    const socials = [linkedin, twitter, facebook];
    return socials.reduce((a, socialURL) => {
      if (!socialURL) {
        return a;
      }

      const { profileName, username } = getSocialProfile(socialURL, this.isMobile);

      return {
        ...a,
        [profileName]: username,
      };
    }, {});
  }

  private _patchSocialURLs(input: UpdateAttendeeInput) {
    const { linkedin, twitter, facebook } = input;
    const socials = { linkedin, twitter, facebook };
    return Object.keys(socials).reduce((a, profileName) => {
      const usernameOrSocialURL = socials[profileName];
      if (!usernameOrSocialURL) {
        return a;
      }
      const sanitizedURL = getSocialLink(profileName, usernameOrSocialURL, this.isMobile);

      return {
        ...a,
        [profileName]: sanitizedURL,
      };
    }, {});
  }
}
