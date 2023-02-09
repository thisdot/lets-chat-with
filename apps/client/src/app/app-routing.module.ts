import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotAuthGuard, AuthGuard } from '@conf-match/core';
import { LayoutComponent } from './layout/layout.component';
import { LayoutModule } from './layout/layout.module';
import { RouteTag } from '@conf-match/shared/route-tags';
import { LogoutComponent } from './logout/logout.component';
import { LogoutModule } from './logout/logout.module';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';

const routes: Routes = [
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then((m) => m.SignupModule),
  },
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then((m) => m.SigninModule),
    canActivate: [NotAuthGuard],
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      routeTags: [RouteTag.settings],
    },
    children: [
      {
        path: 'terms-of-service',
        component: TermsOfServiceComponent,
        data: {
          routeTags: [RouteTag.back],
        },
      },
      {
        path: 'conferences',
        loadChildren: () =>
          import('./conferences/conferences.module').then((m) => m.ConferencesModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'conferences/:conferenceId',
        loadChildren: () =>
          import('./conference/conference.module').then((m) => m.ConferenceModule),
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'recover-pass',
        loadChildren: () =>
          import('./recover-pass/recover-pass.module').then((m) => m.RecoverPassModule),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'conferences',
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    LayoutModule,
    LogoutModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
