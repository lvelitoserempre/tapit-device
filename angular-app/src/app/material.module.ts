import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';

const MaterialModules = [
  MatDatepickerModule,
  MatDialogModule,
  MatProgressSpinnerModule
];


@NgModule({
  imports: [MaterialModules],
  exports: [MaterialModules]
})
export class MaterialModule {
}
