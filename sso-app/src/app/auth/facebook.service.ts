import {Injectable} from '@angular/core';
import {auth} from 'firebase';
import FacebookAuthProvider = auth.FacebookAuthProvider;

@Injectable({
  providedIn: 'root'
})
export class FacebookService {
  facebookAuthProvider: FacebookAuthProvider;

  constructor() {
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
}
