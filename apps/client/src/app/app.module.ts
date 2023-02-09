import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CoreModule } from '@conf-match/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ServiceWorkerModule } from '@angular/service-worker';
import { ModalService, SharedModule } from '@conf-match/shared';
import { Apollo, ApolloModule } from 'apollo-angular';
import { createAppSyncClient } from '@conf-match/api';
import { ThemeService } from '@conf-match/shared/theme';
import { TranslocoRootModule } from './transloco/transloco-root.module';
import { RouteConfigModule } from '@this-dot/route-config';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';

@NgModule({
  declarations: [AppComponent, TermsOfServiceComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
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
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    ApolloModule,
    TranslocoRootModule,
    HammerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    RouteConfigModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(theme: ThemeService, apollo: Apollo, modalService: ModalService) {
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
