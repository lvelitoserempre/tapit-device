import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActualizarCedulaComponent } from './actualizar-cedula.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../auth.guard';


const routes: Routes = [
  {
    path: '',
    component: ActualizarCedulaComponent,
    children: [
      {
        path: 'actualizar-cedula',
        component: ActualizarCedulaComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
]

@NgModule({
  declarations: [ActualizarCedulaComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class ActualizarCedulaModule { }
