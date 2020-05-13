import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../user/auth.service';
import {auth, User} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AlreadyLoggedInGuard implements CanActivate {

  constructor(private router: Router, private userService: AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return new Observable(subscriber => {
      auth().onAuthStateChanged((user: User) => {
        if (user) {
          subscriber.next(this.router.parseUrl('/home'));
        } else {
          subscriber.next(true);
        }
        subscriber.complete();
      });
    });
  }
}
