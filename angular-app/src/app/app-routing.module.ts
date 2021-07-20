import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { WalletComponent } from './wallet/wallet.component';


const routes: Routes = [
  {
    path: 'wallet',
    component: WalletComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
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
