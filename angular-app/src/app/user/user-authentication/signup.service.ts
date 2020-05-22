import {Injectable} from '@angular/core';
import {from} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {UserAuthenticationService} from './user-authentication-service/user-authentication.service';
import {UserDAO} from '../user-dao.service';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private userAuthenticationService: UserAuthenticationService, private userDAO: UserDAO) {
  }

  signUp(form) {
    return from(this.userAuthenticationService.signUp(form.email, form.password))
      .pipe(mergeMap((userCredential: UserCredential) => {
        const userData = this.parseUserData(form);
        return this.userDAO.checkUser(userData);
      }));
  }

  private parseUserData(form) {
    return {
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      birthDate: form.birthDate.toISOString(),
      phone: form.phone,
      origin: 'pola',
      ...(form.referralCode && form.referralCode.trim()) && {referredBy: form.referralCode}
    };
  }
}
