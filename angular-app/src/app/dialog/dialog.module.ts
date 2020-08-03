import {NgModule} from '@angular/core';
import {DialogComponent} from './dialog.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [DialogComponent],
  entryComponents: [DialogComponent],
  imports: [MatDialogModule],
  exports: [DialogComponent]
})
export class DialogModule {
}
