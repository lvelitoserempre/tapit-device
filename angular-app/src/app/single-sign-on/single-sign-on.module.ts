import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {DialogModule} from '../dialog/dialog.module';
import {LoaderModule} from '../loader/loader.module';
import {LoginComponent} from './login/login.component';
import {LoginByEmailComponent} from './login-by-email/login-by-email.component';
import {LoginHeaderComponent} from './login-header/login-header.component';

import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {AppComponent} from './app/app.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

const routes: Routes = [
  {
    path: 'sso',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'login-by-email',
        component: LoginByEmailComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    LoginByEmailComponent,
    LoginHeaderComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    DialogModule,
    LoaderModule,
    RouterModule.forRoot(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  bootstrap: [AppComponent]
})
export class SingleSignOnModule {
}
