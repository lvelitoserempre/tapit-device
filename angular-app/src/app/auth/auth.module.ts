import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AppCommonModule} from '../app-common.module';
import {DialogModule} from '../dialog/dialog.module';
import {RecoveryPasswordComponent} from './recovery-password/recovery-password.component';
import {RecoveryPasswordModule} from './recovery-password/recovery-password.module';


const routes: Routes = [
  /*{
    path: 'login',
    component: LoginComponent,
    canActivate: [AlreadyLoggedInGuard]
  },*/
  {
    path: 'recovery-password',
    component: RecoveryPasswordComponent
  }
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    AppCommonModule,
    DialogModule,
    RecoveryPasswordModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthModule {
}
