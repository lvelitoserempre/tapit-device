import {Injectable} from '@angular/core';
import {from} from 'rxjs';
import {UserDAO} from '../user/user-dao.service';
import {AuthService} from './auth.service';
import {AnalyticsService} from '../services/anaylitics/analytics.service';
import firebase from 'firebase/app';
import 'firebase/auth';
import auth = firebase.auth;
import FacebookAuthProvider = auth.FacebookAuthProvider;

declare var fbq: any;

@Injectable({
  providedIn: 'root'
})
export class FacebookService {
  facebookAuthProvider: FacebookAuthProvider;

  constructor(private userDAO: UserDAO, private authenticationService: AuthService, private analyticsService: AnalyticsService) {
    this.facebookAuthProvider = new FacebookAuthProvider();
    this.facebookAuthProvider.addScope('user_birthday');
    this.facebookAuthProvider.addScope('email');
    this.facebookAuthProvider.addScope('public_profile');
    this.facebookAuthProvider.addScope('user_gender');
    this.facebookAuthProvider.addScope('user_likes');
    this.facebookAuthProvider.addScope('user_location');
    this.facebookAuthProvider.addScope('user_posts');
  }

  login() {
    return from(auth().signInWithPopup(this.facebookAuthProvider))
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

  private sendEventToAnalytics(isNewUser: boolean) {
    if (isNewUser) {
      fbq('track', 'CompleteRegistration');
    }

    this.analyticsService.sendCustomEvent({
      hitType: 'event',
      eventCategory: isNewUser ? 'signup' : 'login',
      eventAction: 'login-facebook'
    });
  }
}
