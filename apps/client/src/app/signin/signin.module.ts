import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule as CmSharedModule } from '@conf-match/shared';
import { SharedUiAuthModule } from '@conf-match/shared/ui-auth';
import { SharedModule as AppSharedModule } from '../shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { MainComponent } from './main/main.component';
import { ClientSharedAuthUiAuthFormModule } from '@conf-match/client/shared/auth/ui-auth-form';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
];

@NgModule({
  declarations: [MainComponent],
  imports: [
    RouterModule.forChild(routes),
    CmSharedModule,
    AppSharedModule,
    ClientSharedAuthUiAuthFormModule,
    SharedUiAuthModule,
    TranslocoModule,
    CommonModule,
  ],
})
export class SigninModule {}
