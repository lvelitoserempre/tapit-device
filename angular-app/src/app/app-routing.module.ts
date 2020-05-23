import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './user/user-authentication/authentication-guards/auth.guard';
import {FinalMessageComponent} from './final-message/final-message.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/user/profile'},
  {
    path: 'auth',
    loadChildren: () => import('./user/user-authentication/user-authentication.module').then(m => m.UserAuthenticationModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {path: 'final-message', component: FinalMessageComponent, canActivate: [AuthGuard]},
  {path: '**', pathMatch: 'full', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
