import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './signin/signin.component';
import { SignInRoutingModule } from './signin-routing.module';
import { SharedUiAuthModule } from '@conf-match/shared/ui-auth';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientSharedAuthUiAuthFormModule } from '@conf-match/client/shared/auth/ui-auth-form';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  imports: [
    CommonModule,
    SignInRoutingModule,
    SharedUiAuthModule,
    ReactiveFormsModule,
    ClientSharedAuthUiAuthFormModule,
    TranslocoModule,
  ],
  declarations: [SignInComponent],
})
export class ClientAdminAuthFeatureSignInModule {}
