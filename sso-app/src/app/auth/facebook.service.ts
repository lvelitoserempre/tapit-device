import {Injectable} from '@angular/core';
import {from} from 'rxjs';
import {auth} from 'firebase';
import {mergeMap} from 'rxjs/operators';
import {UserDAO} from '../user/user-dao.service';
import {AuthService} from './auth.service';
import FacebookAuthProvider = auth.FacebookAuthProvider;

declare var fbq: any;

@Injectable({
  providedIn: 'root'
})
export class FacebookService {
  facebookAuthProvider: FacebookAuthProvider;

  constructor(private userDAO: UserDAO, private authenticationService: AuthService) {
    this.facebookAuthProvider = new FacebookAuthProvider();
    this.facebookAuthProvider.addScope('user_birthday');
  }

  login() {
    return from(auth().signInWithPopup(this.facebookAuthProvider))
      .pipe(mergeMap((facebookResponse) => {
        const userData = this.parseUserData(facebookResponse, {email: facebookResponse.additionalUserInfo.profile['email'],});
        return this.userDAO.checkUser(userData);
      }))
  }

  parseUserData(facebookResponse, otherData?) {
    return {
      firstName: facebookResponse.additionalUserInfo.profile.first_name,
      lastName: facebookResponse.additionalUserInfo.profile.last_name,
      gender: facebookResponse.additionalUserInfo.profile.gender,
      birthDate: (new Date(facebookResponse.additionalUserInfo.profile.birthday)).toISOString(),
      origin: 'web',
      ...otherData
    };
  }
}
