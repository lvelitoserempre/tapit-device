import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { CommonModule } from '@angular/common';
import { ComerciosAliadosComponent } from './comercios-aliados.component';
import { AuthGuard } from '../../auth.guard';
const routes: Routes = [
  {
    path: '',
    component: ComerciosAliadosComponent,
    children: [
      {
        path: 'comercios-aliados',
        component: ComerciosAliadosComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
]

@NgModule({
  declarations: [ComerciosAliadosComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class ComerciosAliadosModule { }
