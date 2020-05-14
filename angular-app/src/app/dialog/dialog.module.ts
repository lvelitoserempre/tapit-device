import {NgModule} from '@angular/core';
import {DialogComponent} from './dialog.component';
import {AppCommonModule} from '../app-common.module';

@NgModule({
  declarations: [DialogComponent],
  entryComponents: [DialogComponent],
  imports: [AppCommonModule],
  exports: [DialogComponent]
})
export class DialogModule {
}
