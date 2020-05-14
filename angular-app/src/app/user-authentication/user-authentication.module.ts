import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AlreadyLoggedInGuard} from './authentication-guards/already-logged-in.guard';
import {SignUpComponent} from './sign-up/sign-up.component';
import {AppCommonModule} from '../app-common.module';
import {DialogModule} from '../dialog/dialog.module';
import {LoaderModule} from '../loader/loader.module';


const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [AlreadyLoggedInGuard]},
  {path: 'signup', component: SignUpComponent, canActivate: [AlreadyLoggedInGuard]},
];

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    AppCommonModule,
    DialogModule,
    LoaderModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserAuthenticationModule {
}
