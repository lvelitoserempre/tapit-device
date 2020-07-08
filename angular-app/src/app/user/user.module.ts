import {NgModule} from '@angular/core';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './user-authentication/authentication-guards/auth.guard';
import {UserResolverService} from './user-resolver.service';
import {MyCodesComponent} from './codes/codes.component';
import {CodeDetailDialogComponent} from './codes/code-detail-dialog/code-detail-dialog.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';

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
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule {
}
