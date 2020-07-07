import {CommonModule} from '@angular/common';
import {RecoveryPasswordComponent} from './recovery-password.component';
import {DialogModule} from '../../../dialog/dialog.module';
import {NgModule} from '@angular/core';
import {LoaderModule} from '../../../loader/loader.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    RecoveryPasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    LoaderModule
  ],
  exports: [
    RecoveryPasswordComponent
  ]
})
export class RecoveryPasswordModule {
}
