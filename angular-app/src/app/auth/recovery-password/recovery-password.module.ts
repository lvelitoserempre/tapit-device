import {CommonModule} from '@angular/common';
import {RecoveryPasswordComponent} from './recovery-password.component';
import {DialogModule} from '../../dialog/dialog.module';
import {NgModule} from '@angular/core';
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
    RouterModule.forChild([])
  ],
  exports: [
    RecoveryPasswordComponent
  ]
})
export class RecoveryPasswordModule {
}
