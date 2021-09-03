import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/auth';
import auth = firebase.auth;
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private cookieService: CookieService
  ) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve: Function, reject: Function) => {
      auth().onAuthStateChanged(()=> {
        if ((auth().currentUser)) {
          return auth().currentUser?.getIdToken()
          .then(idToken => {
            this.cookieService.put('frbtkn', idToken, {});
            resolve(true);
          }).catch(function(error) {
            resolve(false);
          });
        } else {
          resolve(false);
        }
      });
    });
  }

}