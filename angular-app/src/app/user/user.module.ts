import {NgModule} from '@angular/core';
import {ProfileComponent} from './profile/profile.component';
import {RouterModule, Routes} from '@angular/router';
import {MyCodesComponent} from './codes/codes.component';
import {CodeDetailDialogComponent} from './codes/code-detail-dialog/code-detail-dialog.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {ShareComponent} from './share/share.component';
import {UpdateProfileComponent} from './update-profile/update-profile.component';
import {FormProfileComponent} from './update-profile/form-profile/form-profile.component';
import {InfoProfileComponent} from './update-profile/info-profile/info-profile.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      {
        path: 'share',
        component: ShareComponent
      },
      {
        path: 'editar-perfil',
        component: UpdateProfileComponent
      }
    ]
  },
  {
    path: 'codes',
    component: MyCodesComponent
  }
];

@NgModule({
  declarations: [ProfileComponent, MyCodesComponent, CodeDetailDialogComponent, ShareComponent, UpdateProfileComponent, FormProfileComponent, InfoProfileComponent],
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
