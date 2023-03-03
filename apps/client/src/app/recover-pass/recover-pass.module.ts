import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientSharedUiTextFieldWrapperModule } from '@conf-match/client/shared/ui-text-field-wrapper';
import { SharedModule as CmSharedModule } from '@conf-match/shared';
import { SharedModule as AppSharedModule } from '../shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientSharedUiInputModule } from '@conf-match/client/shared/ui-input';
import { SharedUiButtonsModule } from '@conf-match/shared/ui-buttons';
import { TranslocoModule } from '@ngneat/transloco';
import { CurrentEmailComponent } from './recover-pass-flow/current-email/current-email.component';
import { NewPasswordComponent } from './recover-pass-flow/new-password/new-password.component';
import { RecoverPassFlowComponent } from './recover-pass-flow/recover-pass-flow.component';
import { ResetCodeComponent } from './recover-pass-flow/reset-code/reset-code.component';
import { SecurityCodeGuard } from './security-code.guard';

const routes: Routes = [
  {
    path: '',
    component: RecoverPassFlowComponent,
    children: [
      {
        path: 'email',
        component: CurrentEmailComponent,
      },
      {
        path: 'code',
        component: ResetCodeComponent,
        canActivate: [SecurityCodeGuard],
      },
      {
        path: 'new-pass',
        component: NewPasswordComponent,
        canActivate: [SecurityCodeGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [
    RecoverPassFlowComponent,
    CurrentEmailComponent,
    NewPasswordComponent,
    ResetCodeComponent,
  ],
  imports: [
    CommonModule,
    CmSharedModule,
    ClientSharedUiTextFieldWrapperModule,
    ClientSharedUiInputModule,
    AppSharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedUiButtonsModule,
    TranslocoModule,
  ],
  providers: [SecurityCodeGuard],
})
export class RecoverPassModule {}
