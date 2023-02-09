import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { BannedComponent } from './banned.component';
import { CommonModule } from '@angular/common';
import { SharedModule as CmSharedModule } from '@conf-match/shared';
import { SharedModule as AppSharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: BannedComponent,
  },
];

@NgModule({
  declarations: [BannedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CmSharedModule,
    AppSharedModule,
    TranslocoModule,
  ],
})
export class BannedModule {}
