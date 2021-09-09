import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComoRedimirComponent } from './como-redimir.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth.guard';


const routes: Routes = [
  {
    path: '',
    component: ComoRedimirComponent,
    children: [
      {
        path: 'como-redimir',
        component: ComoRedimirComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
]

@NgModule({
  declarations: [ComoRedimirComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class ComoRedimirModule { }
