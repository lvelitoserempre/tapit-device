import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserAuthenticationService} from '../user-authentication-service/user-authentication.service';
import {auth, User} from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private userService: UserAuthenticationService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return new Observable(subscriber => {
      auth().onAuthStateChanged((user: User) => {
        if (user) {
          subscriber.next(true);
        } else {
          subscriber.next(this.router.parseUrl('/auth/login'));
        }
        subscriber.complete();
      });
    });
  }
}
