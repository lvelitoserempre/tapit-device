import {NgModule} from '@angular/core';
import {LoaderComponent} from './loader.component';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [LoaderComponent],
  entryComponents: [LoaderComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [LoaderComponent]
})
export class LoaderModule {
}
