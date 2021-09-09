import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EscaneaYaComponent } from './escanea-ya.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth.guard';
const routes: Routes = [
  {
    path: '',
    component: EscaneaYaComponent,
    children: [
      {
        path: 'escanea-ya',
        component: EscaneaYaComponent,
        canActivate: [AuthGuard]
        
      }
    ]
  }
]

@NgModule({
  declarations: [EscaneaYaComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class EscaneaYaModule { }
