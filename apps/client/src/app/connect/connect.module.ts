import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { ConnectComponent } from './connect.component';
import { SharedModule as CmSharedModule } from '@conf-match/shared';
import { SharedModule as AppSharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { SharedUiButtonsModule } from '@conf-match/shared/ui-buttons';
import { RouteTag } from '@conf-match/shared/route-tags';
import { ClientConferenceConnectDataAccessModule } from '@conf-match/client/conference/connect/data-access';
import { LetModule } from '@ngrx/component';

const routes: Routes = [
  {
    path: '',
    component: ConnectComponent,
    data: {
      routeTags: [RouteTag.conference, RouteTag.connect, RouteTag.settings, RouteTag.share],
    },
  },
];

@NgModule({
  declarations: [ConnectComponent, OnboardingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LetModule,
    ClientConferenceConnectDataAccessModule,
    CmSharedModule,
    AppSharedModule,
    SharedUiButtonsModule,
    SharedUiIconsModule,
    TranslocoModule,
  ],
})
export class ConnectModule {}
