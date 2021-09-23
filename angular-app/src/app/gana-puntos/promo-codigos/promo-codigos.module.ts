import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromoCodigosComponent } from './promo-codigos.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: PromoCodigosComponent
  }
];

@NgModule({
  declarations: [
    PromoCodigosComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxLoadingModule,
    FormsModule
  ]
})
export class PromoCodigosModule { }
