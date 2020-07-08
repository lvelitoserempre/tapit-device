import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./user/user-authentication/user-authentication.module').then(m => m.UserAuthenticationModule)
  },
  {
    path: 'app/auth',
    loadChildren: () => import('./user/user-authentication/user-authentication.module').then(m => m.UserAuthenticationModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'app/user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
