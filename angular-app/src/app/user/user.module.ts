import {NgModule} from '@angular/core';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {AppCommonModule} from '../app-common.module';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './user-authentication/authentication-guards/auth.guard';
import {UserResolverService} from './user-resolver.service';

const routes: Routes = [
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
    resolve: {user: UserResolverService}
  }
];

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    AppCommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule {
}
