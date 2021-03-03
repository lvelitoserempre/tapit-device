import {NgModule} from '@angular/core';
import {DialogComponent} from './dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [DialogComponent],
  entryComponents: [DialogComponent],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [DialogComponent]
})
export class DialogModule {
}
