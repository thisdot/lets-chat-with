import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '@conf-match/client/admin/core/feature-layout';
import { RouteTag } from '@conf-match/shared/route-tags';
import { AuthGuard, NotAuthGuard } from '@conf-match/client/admin/auth/data-access';

const routes: Routes = [
  {
    path: 'signin',
    loadChildren: () =>
      import('@conf-match/client/admin/auth/feature-signin').then(
        (m) => m.ClientAdminAuthFeatureSignInModule
      ),
    canActivate: [NotAuthGuard],
  },
  {
    path: 'logout',
    loadChildren: () =>
      import('@conf-match/client/admin/auth/feature-signout').then(
        (m) => m.ClientAdminAuthFeatureSignOutModule
      ),
    canActivate: [AuthGuard],
    data: {
      routeTags: [RouteTag.pageWithHeader],
    },
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      routeTags: [RouteTag.settings],
    },
    children: [
      {
        path: 'reports',
        loadChildren: () =>
          import('@conf-match/client/admin/reports/feature-reports').then(
            (m) => m.ClientAdminReportsFeatureReportsModule
          ),
        canActivate: [AuthGuard],
        data: {
          routeTags: [RouteTag.pageWithHeader],
        },
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'reports',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class ShellRoutingModule {}
