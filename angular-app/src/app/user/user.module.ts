import {NgModule} from '@angular/core';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {AppCommonModule} from '../app-common.module';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './user-authentication/authentication-guards/auth.guard';
import {UserResolverService} from './user-resolver.service';
import {MyCodesComponent} from './codes/codes.component';
import {CodeDetailDialogComponent} from './codes/code-detail-dialog/code-detail-dialog.component';
import {RecoveryPasswordComponent} from './user-authentication/recovery-password/recovery-password.component';

const routes: Routes = [
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
    resolve: {user: UserResolverService}
  },
  {
    path: 'codes',
    component: MyCodesComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [UserProfileComponent, MyCodesComponent, CodeDetailDialogComponent],
  imports: [
    AppCommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule {
}
