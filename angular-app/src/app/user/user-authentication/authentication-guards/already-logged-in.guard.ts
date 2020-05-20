import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserAuthenticationService} from '../user-authentication-service/user-authentication.service';
import {auth, User} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AlreadyLoggedInGuard implements CanActivate {

  constructor(private router: Router, private userService: UserAuthenticationService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return new Observable(subscriber => {
      auth().onAuthStateChanged((user: User) => {
        if (user) {
          subscriber.next(this.router.parseUrl('/'));
        } else {
          subscriber.next(true);
        }
        subscriber.complete();
      });
    });
  }
}
