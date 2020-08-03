import {Injectable} from '@angular/core';
import {from} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {UserDAO} from '../user/user-dao.service';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private userAuthenticationService: AuthService, private userDAO: UserDAO) {
  }

  static parseUserData(form, origin = 'pola') {
    return {
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      birthDate: form.birthDate.toISOString(),
      origin,
      ...(form.referralCode && form.referralCode.trim()) && {referredBy: form.referralCode}
    };
  }

  signUp(form) {
    return from(this.userAuthenticationService.signUp(form.email, form.password))
      .pipe(mergeMap((userCredential: UserCredential) => {
        const userData = SignUpService.parseUserData(form);
        return this.userDAO.checkUser(userData);
      }));
  }
}
