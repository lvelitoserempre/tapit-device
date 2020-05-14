import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './user-authentication/authentication-guards/auth.guard';
import {FinalMessageComponent} from './final-message/final-message.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {
    path: 'auth',
    loadChildren: () => import('./user-authentication/user-authentication.module').then(m => m.UserAuthenticationModule)
  },
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'final-message', component: FinalMessageComponent, canActivate: [AuthGuard]},
  {path: '**', pathMatch: 'full', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
