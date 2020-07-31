import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {environment} from './environments/environment';
import {SingleSignOnModule} from './app/single-sign-on/single-sign-on.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(SingleSignOnModule)
  .catch(err => console.error(err));

