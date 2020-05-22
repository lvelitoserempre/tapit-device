import {NgModule} from '@angular/core';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {AppCommonModule} from '../app-common.module';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './user-authentication/authentication-guards/auth.guard';
import {SocialButtonsModule} from '../social-media/social-buttons.module';

const routes: Routes = [
  {path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    AppCommonModule,
    RouterModule.forChild(routes),
    SocialButtonsModule
  ]
})
export class UserModule {
}
