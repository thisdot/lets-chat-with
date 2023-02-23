import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ConferencesRoutingModule } from './conferences-routing.module';
import { ConferencesComponent } from './conferences.component';
import { SharedModule as CmSharedModule } from '@conf-match/shared';
import { SharedModule as AppSharedModule } from '../shared/shared.module';
import { JoinConferenceModalComponent } from './join-conference-modal/join-conference-modal.component';
import { ConferenceUrlFormComponent } from './conference-url-form/conference-url-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QrScanComponent } from './qr-scan/qr-scan.component';
import { JoinConferenceComponent } from './join-conference/join-conference.component';
import { JoinConferenceWizardComponent } from './join-conference/join-conference-wizard/join-conference-wizard.component';
import { BasicInfoComponent } from './join-conference/join-conference-wizard/basic-info/basic-info.component';
import { SocialsComponent } from './join-conference/join-conference-wizard/socials/socials.component';
import { UploadPhotoComponent } from './join-conference/join-conference-wizard/upload-photo/upload-photo.component';
import { LookingForComponent } from './join-conference/join-conference-wizard/looking-for/looking-for.component';
import { InterestsComponent } from './join-conference/join-conference-wizard/interests/interests.component';
import { BioComponent } from './join-conference/join-conference-wizard/bio/bio.component';
import { WIZARD_FALLBACK_ROUTE } from '../shared/wizard';
import { SharedUiButtonsModule } from '@conf-match/shared/ui-buttons';
import { TranslocoModule } from '@ngneat/transloco';
import { A11yModule } from '@angular/cdk/a11y';
import { WhoIAmComponent } from './join-conference/join-conference-wizard/who-i-am/who-i-am.component';
import { SharedDataAccessFileUploadModule } from '@conf-match/shared/data-access-file-upload';
import { ReadQrInProgressComponent } from './qr-scan/read-qr-in-progress.component';
import { ShareConferenceModalComponent } from './share-conference-modal/share-conference-modal.component';
import { ConferenceResolversModule } from './conference-resolvers/conference-resolvers.module';
import { ClientSharedUiInputModule } from '@conf-match/client/shared/ui-input';
import { ContentLoaderModule } from '@ngneat/content-loader';

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
    ContentLoaderModule,
  ],
  providers: [
    {
      provide: WIZARD_FALLBACK_ROUTE,
      useValue: '/conferences/domain',
    },
  ],
})
export class ConferencesModule {}
