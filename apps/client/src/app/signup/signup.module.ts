import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthNonVerifiedGuard, CoreModule, NotAuthGuard } from '@conf-match/core';
import { SharedModule as CmSharedModule } from '@conf-match/shared';
import { SharedUiAuthModule } from '@conf-match/shared/ui-auth';

import { SharedModule as AppSharedModule } from '../shared/shared.module';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { ApplicationTermsComponent } from './signup-wizard/terms/application-terms.component';
import { VerifyComponent } from './signup-wizard/verify/verify.component';
import { SignupWizardComponent } from './signup-wizard/signup-wizard.component';
import { SharedUiButtonsModule } from '@conf-match/shared/ui-buttons';
import { TranslocoModule } from '@ngneat/transloco';
import { ClientSharedAuthUiAuthFormModule } from '@conf-match/client/shared/auth/ui-auth-form';

const routes: Routes = [
  {
    path: '',
    component: WelcomeScreenComponent,
    canActivate: [NotAuthGuard],
    pathMatch: 'full',
  },
  {
    path: '',
    component: SignupWizardComponent,
    canActivate: [AuthNonVerifiedGuard],
    children: [
      {
        path: 'terms',
        component: ApplicationTermsComponent,
      },
      {
        path: 'verify',
        component: VerifyComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    SharedUiAuthModule,
    SharedUiButtonsModule,
    RouterModule.forChild(routes),
    CommonModule,
    CoreModule,
    CmSharedModule,
    AppSharedModule,
    ClientSharedAuthUiAuthFormModule,
    FormsModule,
    ReactiveFormsModule,
    TranslocoModule,
  ],
  declarations: [
    WelcomeScreenComponent,
    SignupWizardComponent,
    ApplicationTermsComponent,
    VerifyComponent,
  ],
})
export class SignupModule {}
