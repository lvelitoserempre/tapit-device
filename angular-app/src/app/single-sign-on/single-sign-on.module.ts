import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {DialogModule} from '../dialog/dialog.module';
import {LoaderModule} from '../loader/loader.module';
import {LoginComponent} from './login/login.component';
import {SingleSignOnComponent} from './single-sign-on/single-sign-on.component';

const routes: Routes = [
  {
    path: 'sso',
    children: [
      {
        path: 'login',
        component: LoginComponent
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
    SingleSignOnComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    DialogModule,
    LoaderModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [SingleSignOnComponent]
})
export class SingleSignOnModule {
}
