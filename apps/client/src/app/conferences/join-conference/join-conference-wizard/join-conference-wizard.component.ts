import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BasicInfoFormInput } from './basic-info/basic-info.component';
import { SocialsFormInput } from './socials/socials.component';
import { UploadPhotoFormInput } from './upload-photo/upload-photo.component';
import { LookingForFormInput } from './looking-for/looking-for.component';
import { InterestsFormInput } from './interests/interests.component';
import { joinConferenceAttempted } from '@conf-match/core';
import { BioFormInput } from './bio/bio.component';
import { Store } from '@ngrx/store';
import { WhoIAmFormInput } from './who-i-am/who-i-am.component';

type WizardInput = BasicInfoFormInput &
  SocialsFormInput &
  UploadPhotoFormInput &
  LookingForFormInput &
  WhoIAmFormInput &
  InterestsFormInput &
  BioFormInput;

const Routes = [
  './basic-info',
  './socials',
  './upload-photo',
  './looking-for',
  './who-i-am',
  './interests',
  './bio',
];

@Component({
  selector: 'cm-join-conference-wizard',
  templateUrl: './join-conference-wizard.component.html',
  styles: [
    `
      :host {
        min-height: 100vh;
        min-height: 100svh;
      }
    `,
  ],
})
export class JoinConferenceWizardComponent {
  routes = Routes;

  constructor(private _store: Store<{}>, private _activatedRoute: ActivatedRoute) {}

  onCompleted(data: WizardInput) {
    const conferenceId = this._activatedRoute.snapshot.paramMap.get('conferenceId');
    this._store.dispatch(
      joinConferenceAttempted({
        fullName: data.fullName,
        title: data.title || null,
        company: data.company || null,
        pronouns: data.pronouns || null,
        newsletterSubscribed: data.newsletterSubscribed,
        linkedin: data.linkedin || null,
        facebook: data.facebook || null,
        twitter: data.twitter || null,
        avatarUrl: data.avatarUrl,
        connections: [...data.connections].map((identifier) => identifier.id),
        identifiers: data.identifiers.map((identifier) => identifier.id),
        interests: data.interests.map((interest) => interest.id),
        bio: data.bio,
        conferenceId,
      })
    );
  }
}
