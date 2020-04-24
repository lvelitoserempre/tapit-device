import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from '../services/auth/auth.service';
import {UserService} from '../user/user.service';
import {map, take, takeLast} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlreadyLoggedInGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return of(true) || this.userService.getCurrentUser().pipe(take(1)).pipe(map(user => {
      console.log('test');
      return user ? this.router.parseUrl('/home') : true;
    }));
  }
}
