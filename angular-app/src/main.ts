import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {SingleSignOnModule} from './app/single-sign-on/single-sign-on.module';

if (environment.production) {
  enableProdMode();
}

if (window.location.pathname.startsWith('/sso') || window.location.pathname.startsWith('/app/sso')) {
  platformBrowserDynamic().bootstrapModule(SingleSignOnModule)
    .catch(err => console.error(err));
} else {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
}

