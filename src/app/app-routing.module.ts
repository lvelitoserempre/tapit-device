import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up/sign-up.component';
import { AlreadyLoggedInGuard } from './guards/already-logged-in.guard';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'login', component: LoginComponent, canActivate: [ AlreadyLoggedInGuard ] },
  { path: 'signup', component: SignUpComponent, canActivate: [ AlreadyLoggedInGuard ] },
  { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
