import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteTag } from '@conf-match/shared/route-tags';
import { VisitedGuard } from '../shared/wizard';
import { ConferenceResolver } from './conference-resolvers/conference.resolver';
import { ConferenceUrlFormComponent } from './conference-url-form/conference-url-form.component';
import { ConferencesComponent } from './conferences.component';
import { BasicInfoComponent } from './join-conference/join-conference-wizard/basic-info/basic-info.component';
import { BioComponent } from './join-conference/join-conference-wizard/bio/bio.component';
import { InterestsComponent } from './join-conference/join-conference-wizard/interests/interests.component';
import { JoinConferenceWizardComponent } from './join-conference/join-conference-wizard/join-conference-wizard.component';
import { LookingForComponent } from './join-conference/join-conference-wizard/looking-for/looking-for.component';
import { SocialsComponent } from './join-conference/join-conference-wizard/socials/socials.component';
import { UploadPhotoComponent } from './join-conference/join-conference-wizard/upload-photo/upload-photo.component';
import { WhoIAmComponent } from './join-conference/join-conference-wizard/who-i-am/who-i-am.component';
import { JoinConferenceComponent } from './join-conference/join-conference.component';
import { JoinConferenceGuard } from './join-conference/join-conference.guard';
import { QrScanComponent } from './qr-scan/qr-scan.component';
import { ReadQrInProgressComponent } from './qr-scan/read-qr-in-progress.component';
import { ReadQrResolverService } from './qr-scan/read-qr-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ConferencesComponent,
  },
  {
    path: 'domain',
    component: ConferenceUrlFormComponent,
    data: {
      routeTags: [RouteTag.back],
    },
  },
  {
    path: 'qr-scan',
    component: QrScanComponent,
    data: {
      routeTags: [RouteTag.back],
    },
  },
  {
    path: 'read-qr',
    component: ReadQrInProgressComponent,
    resolve: {
      domain: ReadQrResolverService,
    },
  },
  {
    path: ':conferenceId/join',
    component: JoinConferenceComponent,
    canActivate: [JoinConferenceGuard],
    data: {
      routeTags: [RouteTag.back],
      cmRouteProgressState: 0,
    },
    resolve: {
      conference: ConferenceResolver,
    },
  },
  {
    path: ':conferenceId/join',
    component: JoinConferenceWizardComponent,
    canActivate: [JoinConferenceGuard],
    resolve: {
      conference: ConferenceResolver,
    },
    children: [
      {
        path: 'basic-info',
        component: BasicInfoComponent,
        data: {
          subscribeBox: true,
          routeTags: [RouteTag.back, RouteTag.displayConferenceLogo],
          cmRouteProgressState: 0.15,
        },
      },
      {
        path: 'socials',
        component: SocialsComponent,
        canActivate: [VisitedGuard],
        data: {
          routeTags: [RouteTag.back, RouteTag.displayConferenceLogo],
          cmRouteProgressState: 0.3,
        },
      },
      {
        path: 'upload-photo',
        component: UploadPhotoComponent,
        canActivate: [VisitedGuard],
        data: {
          routeTags: [RouteTag.back, RouteTag.displayConferenceLogo],
          cmRouteProgressState: 0.45,
        },
      },
      {
        path: 'looking-for',
        component: LookingForComponent,
        canActivate: [VisitedGuard],
        data: {
          routeTags: [RouteTag.back, RouteTag.displayConferenceLogo],
          cmRouteProgressState: 0.55,
        },
        resolve: {
          conference: ConferenceResolver,
        },
      },
      {
        path: 'who-i-am',
        component: WhoIAmComponent,
        canActivate: [VisitedGuard],
        data: {
          routeTags: [RouteTag.back, RouteTag.displayConferenceLogo],
          cmRouteProgressState: 0.75,
        },
        resolve: {
          conference: ConferenceResolver,
        },
      },
      {
        path: 'interests',
        component: InterestsComponent,
        canActivate: [VisitedGuard],
        data: {
          routeTags: [RouteTag.back, RouteTag.displayConferenceLogo],
          cmRouteProgressState: 0.85,
        },
        resolve: {
          conference: ConferenceResolver,
        },
      },
      {
        path: 'bio',
        component: BioComponent,
        canActivate: [VisitedGuard],
        data: {
          routeTags: [RouteTag.back, RouteTag.displayConferenceLogo],
          cmRouteProgressState: 1,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConferencesRoutingModule {}
