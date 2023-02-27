import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientSharedUiInputModule } from '@conf-match/client/shared/ui-input';
import { SharedModule as CmSharedModule } from '@conf-match/shared';
import { SharedDataAccessFileUploadModule } from '@conf-match/shared/data-access-file-upload';
import { SharedUiButtonsModule } from '@conf-match/shared/ui-buttons';
import { TranslocoModule } from '@ngneat/transloco';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { SharedModule as AppSharedModule } from '../shared/shared.module';
import { WIZARD_FALLBACK_ROUTE } from '../shared/wizard';
import { ConferenceResolversModule } from './conference-resolvers/conference-resolvers.module';
import { ConferenceUrlFormComponent } from './conference-url-form/conference-url-form.component';
import { ConferencesRoutingModule } from './conferences-routing.module';
import { ConferencesComponent } from './conferences.component';
import { JoinConferenceModalComponent } from './join-conference-modal/join-conference-modal.component';
import { BasicInfoComponent } from './join-conference/join-conference-wizard/basic-info/basic-info.component';
import { BioComponent } from './join-conference/join-conference-wizard/bio/bio.component';
import { InterestsComponent } from './join-conference/join-conference-wizard/interests/interests.component';
import { JoinConferenceWizardComponent } from './join-conference/join-conference-wizard/join-conference-wizard.component';
import { LookingForComponent } from './join-conference/join-conference-wizard/looking-for/looking-for.component';
import { SocialsComponent } from './join-conference/join-conference-wizard/socials/socials.component';
import { UploadPhotoComponent } from './join-conference/join-conference-wizard/upload-photo/upload-photo.component';
import { WhoIAmComponent } from './join-conference/join-conference-wizard/who-i-am/who-i-am.component';
import { JoinConferenceComponent } from './join-conference/join-conference.component';
import { QrScanComponent } from './qr-scan/qr-scan.component';
import { ReadQrInProgressComponent } from './qr-scan/read-qr-in-progress.component';
import { ShareConferenceModalComponent } from './share-conference-modal/share-conference-modal.component';

@NgModule({
  declarations: [
    ConferencesComponent,
    JoinConferenceModalComponent,
    ShareConferenceModalComponent,
    ConferenceUrlFormComponent,
    QrScanComponent,
    JoinConferenceComponent,
    JoinConferenceWizardComponent,
    BasicInfoComponent,
    SocialsComponent,
    UploadPhotoComponent,
    LookingForComponent,
    WhoIAmComponent,
    InterestsComponent,
    BioComponent,
    ReadQrInProgressComponent,
  ],
  imports: [
    CommonModule,
    ConferencesRoutingModule,
    ReactiveFormsModule,
    CmSharedModule,
    AppSharedModule,
    SharedUiButtonsModule,
    TranslocoModule,
    A11yModule,
    SharedDataAccessFileUploadModule,
    ZXingScannerModule,
    ConferenceResolversModule,
    ClientSharedUiInputModule,
  ],
  providers: [
    {
      provide: WIZARD_FALLBACK_ROUTE,
      useValue: '/conferences/domain',
    },
  ],
})
export class ConferencesModule {}
