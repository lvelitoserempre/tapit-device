import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../user/user.service';
import {auth, User} from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return new Observable(subscriber => {
      auth().onAuthStateChanged((user: User) => {
        if (user) {
          subscriber.next(true);
        } else {
          subscriber.next(this.router.parseUrl('/login'));
        }
        subscriber.complete();
      });
    });
  }
}
