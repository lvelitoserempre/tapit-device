import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {auth, User} from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private activatedRoute: ActivatedRoute) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return new Observable(subscriber => {
      auth().onAuthStateChanged((user: User) => {
        if (user) {
          subscriber.next(true);
        } else {
          //if (window.location.hostname !== 'localhost') {
            const showSSOParam = '?showSSO=true';
            const showReturnUrl = window.location.href.search('recovery-password') == -1 ? '?&returnUrl=' + encodeURIComponent(window.location.href) : ''
            window.location.replace(window.location.protocol + '//' + window.location.host + showSSOParam + showReturnUrl);
          //}

          subscriber.next(false);
        }
        subscriber.complete();
      });
    });
  }
}
