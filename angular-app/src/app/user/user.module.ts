import {NgModule} from '@angular/core';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {AppCommonModule} from '../app-common.module';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './user-authentication/authentication-guards/auth.guard';
import {UserResolverService} from './user-resolver.service';
import { MyCodesComponent } from './codes/codes.component';

const routes: Routes = [
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
    resolve: {user: UserResolverService}
  },
  {path: 'codes', component: MyCodesComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [UserProfileComponent, MyCodesComponent],
  imports: [
    AppCommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule {
}
