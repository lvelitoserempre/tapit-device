import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {UserAccount} from '../models/user-account.model';
import {Observable} from 'rxjs';
import {AuthService} from './user-authentication/user-authentication-service/auth.service';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<UserAccount> {

  constructor(private authenticationService: AuthService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserAccount> {
    return this.authenticationService.getCurrentUser().pipe(take(1));
  }
}
