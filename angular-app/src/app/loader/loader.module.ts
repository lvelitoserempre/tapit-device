import {NgModule} from '@angular/core';
import {AppCommonModule} from '../app-common.module';
import {LoaderComponent} from './loader.component';

@NgModule({
  declarations: [LoaderComponent],
  entryComponents: [LoaderComponent],
  imports: [AppCommonModule],
  exports: [LoaderComponent]
})
export class LoaderModule {
}
