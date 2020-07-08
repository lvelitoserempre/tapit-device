import {CommonModule} from '@angular/common';
import {RecoveryPasswordComponent} from './recovery-password.component';
import {DialogModule} from '../../../dialog/dialog.module';
import {NgModule} from '@angular/core';
import {LoaderModule} from '../../../loader/loader.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    RecoveryPasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    LoaderModule,
    RouterModule.forChild([])
  ],
  exports: [
    RecoveryPasswordComponent
  ]
})
export class RecoveryPasswordModule {
}
