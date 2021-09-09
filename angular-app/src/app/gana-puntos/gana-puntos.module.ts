import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { CommonModule } from '@angular/common';
import { GanaPuntosComponent } from './gana-puntos.component';
import { PageComponent } from './page/page.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: '',
    component: GanaPuntosComponent,
    children: [
      {
        path: 'page',
        component: PageComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
]

@NgModule({
  declarations: [GanaPuntosComponent, PageComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class GanaPuntosModule { }
