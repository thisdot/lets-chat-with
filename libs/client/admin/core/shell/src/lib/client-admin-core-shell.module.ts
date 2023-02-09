import { NgModule } from '@angular/core';
import { ShellRoutingModule } from './shell-routing.module';
import { RouteConfigModule } from '@this-dot/route-config';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@conf-match/client/admin/core/environments';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { Apollo, ApolloModule } from 'apollo-angular';
import { TranslocoRootModule } from '@conf-match/client/admin/i18n/util-transloco-root';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ThemeService } from '@conf-match/shared/theme';
import { ModalService } from '@conf-match/shared';
import { createAppSyncClient } from '@conf-match/api';
import { OverlayModule } from '@angular/cdk/overlay';
import { ClientAdminAuthDataAccessModule } from '@conf-match/client/admin/auth/data-access';
import { ClientAdminCoreFeatureLayoutModule } from '@conf-match/client/admin/core/feature-layout';
import { ClientAdminCoreStateModule } from '@conf-match/client/admin/core/state';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    ApolloModule,
    ShellRoutingModule,
    OverlayModule,
    ClientAdminCoreFeatureLayoutModule,
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true,
          strictActionWithinNgZone: true,
          strictActionTypeUniqueness: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    ClientAdminAuthDataAccessModule,
    TranslocoRootModule,
    RouteConfigModule.forRoot(),
    ClientAdminCoreStateModule,
  ],
})
export class ClientAdminCoreShellModule {
  constructor(theme: ThemeService, apollo: Apollo, private modalService: ModalService) {
    theme.init();
    apollo.setClient(
      createAppSyncClient(
        modalService.initSpinner(),
        environment.graphQlEndpoint,
        environment.awsRegion
      )
    );
  }
}
