import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@conf-match/core';
import { ConferenceSelectedResolverService } from './conference-selected-resolver.service';
import { ConferenceComponent } from './conference.component';
import { ConferenceGuard } from './conference.guard';
import { MainNavComponent } from '../shared/main-nav/main-nav.component';
import { RouteTag } from '@conf-match/shared/route-tags';
import { ConferenceBanGuard } from './conference-ban.guard';

const routes: Routes = [
  {
    path: '',
    component: ConferenceComponent,
    canActivate: [AuthGuard, ConferenceGuard],
    data: {
      routeTags: [RouteTag.conference, RouteTag.settings, RouteTag.share],
    },
    resolve: {
      conferenceId: ConferenceSelectedResolverService,
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'connect',
      },
      {
        path: 'connect',
        loadChildren: () => import('./../connect/connect.module').then((m) => m.ConnectModule),
        canActivate: [ConferenceBanGuard],
      },
      {
        path: 'chatters',
        loadChildren: () => import('./../matches/matches.module').then((m) => m.MatchesModule),
        canActivate: [ConferenceBanGuard],
      },
      {
        path: 'messages',
        loadChildren: () => import('./../messages/messages.module').then((m) => m.MessagesModule),
        canActivate: [ConferenceBanGuard],
      },
      {
        path: 'banned',
        loadChildren: () => import('./../banned/banned.module').then((m) => m.BannedModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('./../profile/profile.module').then((m) => m.ProfileModule),
      },
    ],
  },
  { path: '', component: MainNavComponent, outlet: 'main-nav' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ConferenceSelectedResolverService],
})
export class ConferenceRoutingModule {}
