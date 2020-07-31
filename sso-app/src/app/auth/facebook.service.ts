import {Injectable} from '@angular/core';
import {from} from 'rxjs';
import {auth} from 'firebase';
import {mergeMap} from 'rxjs/operators';
import {UserDAO} from '../user/user-dao.service';
import {AuthService} from './auth.service';
import FacebookAuthProvider = auth.FacebookAuthProvider;

@Injectable({
  providedIn: 'root'
})
export class FacebookService {
  facebookAuthProvider: FacebookAuthProvider;

  constructor(private userDAO: UserDAO, private authenticationService: AuthService) {
    this.facebookAuthProvider = new FacebookAuthProvider();
    this.facebookAuthProvider.addScope('user_birthday');
  }

  static parseUserData(facebookResponse, project = 'web', otherData?) {
    const profile = facebookResponse.additionalUserInfo.profile;

    if (!profile.email) {
      throw {code: 'facebook-not-authorized-email'};
    }

    return {
      email: profile.email,
      firstName: profile.first_name,
      lastName: profile.last_name,
      origin: project,
      ...(profile.gender ? {gender: profile.gender} : {}),
      ...(profile.birthday ? {birthDate: (new Date(profile.birthday)).toISOString()} : {}),
      ...otherData
    };
  }

  login() {
    return from(auth().signInWithPopup(this.facebookAuthProvider))
      .pipe(mergeMap((facebookResponse) => {
        const userData = FacebookService.parseUserData(facebookResponse);
        return this.userDAO.checkUser(userData);
      }))
  }
}
