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
import {RecoveryPasswordComponent} from '../user/user-authentication/recovery-password/recovery-password.component';
import {RecoveryPasswordModule} from '../user/user-authentication/recovery-password/recovery-password.module';

const routes: Routes = [
  {
    path: 'sso',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'recovery-password',
        component: RecoveryPasswordComponent
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
    RouterModule.forRoot(routes),
    DialogModule,
    LoaderModule,
    RecoveryPasswordModule
  ],
  bootstrap: [SingleSignOnComponent]
})
export class SingleSignOnModule {
}
