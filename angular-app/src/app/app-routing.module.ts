import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {
    path: 'wallet',
    loadChildren: () => import('./wallet/wallet.module').then(m => m.WalletModule),
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
    redirectTo: 'user/profile'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
