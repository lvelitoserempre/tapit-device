import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuard } from './auth.guard';
import { RemoteConfigGuard } from './remote-config.guard';
import { PocDetailComponent } from './wallet/poc-detail/poc-detail.component';


const routes: Routes = [

  {
    path: 'gana-puntos',
    loadChildren: () => import('./gana-puntos/gana-puntos.module').then(m => m.GanaPuntosModule),
  },
  {
    path: 'comercios-aliados',
    loadChildren: () => import('./gana-puntos/comercios-aliados/comercios-aliados.module').then(m => m.ComerciosAliadosModule),
  },
  {
    path: 'actualizar-cedula',
    loadChildren: () => import('./gana-puntos/actualizar-cedula/actualizar-cedula.module').then(m => m.ActualizarCedulaModule),
  },
  {
    path: 'escanea-ya',
    loadChildren: () => import('./gana-puntos/escanea-ya/escanea-ya.module').then(m => m.EscaneaYaModule),
  },
  {
    path: 'como-redimir',
    loadChildren: () => import('./gana-puntos/como-redimir/como-redimir.module').then(m => m.ComoRedimirModule),
  },

  {
    path: 'wallet',
    loadChildren: () => import('./wallet/wallet.module').then(m => m.WalletModule),
    canActivate: [AuthGuard, RemoteConfigGuard]
  },
  {
    path: 'poc/:id',
    component: PocDetailComponent,
    canActivate: [AuthGuard, RemoteConfigGuard]
  },
  {
    path: 'gana-puntos',
    loadChildren: () => import('./gana-puntos/gana-puntos.module').then(m => m.GanaPuntosModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'comercios-aliados',
    loadChildren: () => import('./gana-puntos/comercios-aliados/comercios-aliados.module').then(m => m.ComerciosAliadosModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'actualizar-cedula',
    loadChildren: () => import('./gana-puntos/actualizar-cedula/actualizar-cedula.module').then(m => m.ActualizarCedulaModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'escanea-ya',
    loadChildren: () => import('./gana-puntos/escanea-ya/escanea-ya.module').then(m => m.EscaneaYaModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'como-redimir',
    loadChildren: () => import('./gana-puntos/como-redimir/como-redimir.module').then(m => m.ComoRedimirModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'user/profile',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
