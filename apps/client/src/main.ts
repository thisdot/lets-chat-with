import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { Auth } from '@aws-amplify/auth';
import { Amplify } from '@aws-amplify/core';

import 'hammerjs';

Amplify.configure({
  Auth: environment.cognito,
});

// TODO [RWO] - This is only for debugging purposes
(window as any).__DONOTUSE__ = Auth;

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
