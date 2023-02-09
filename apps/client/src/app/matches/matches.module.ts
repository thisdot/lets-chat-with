import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { MatchesComponent } from './matches.component';
import { SharedModule as AppSharedModule } from '../shared/shared.module';
import { SharedModule as CmSharedModule } from '@conf-match/shared';
import { MatchProfileComponent } from './profile/match-profile.component';

import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { SharedUiButtonsModule } from '@conf-match/shared/ui-buttons';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: MatchesComponent },
      { path: ':matchId', component: MatchProfileComponent },
    ]),
    AppSharedModule,
    SharedUiButtonsModule,
    CmSharedModule,
    SharedUiIconsModule,
    TranslocoModule,
  ],
  declarations: [MatchesComponent, MatchProfileComponent],
})
export class MatchesModule {}
