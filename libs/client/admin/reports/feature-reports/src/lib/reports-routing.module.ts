import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsDispatcherComponent } from './components/reports-dispatcher/reports-dispatcher.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ConferenceSelectedResolverService } from '@conf-match/client/admin/core/state';
import { ReportsHeaderComponent } from './components/reports-header.component';

const routes: Routes = [
  { path: '', component: ReportsDispatcherComponent, pathMatch: 'full' },
  {
    path: ':conferenceId',
    component: ReportsComponent,
    resolve: {
      conferenceId: ConferenceSelectedResolverService,
    },
  },
  {
    path: '',
    component: ReportsHeaderComponent,
    outlet: 'main-header',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ReportsRoutingModule {}
