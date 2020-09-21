import {Injectable} from '@angular/core';
import {from} from 'rxjs';
import {auth} from 'firebase';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import {UserDAO} from '../user-dao.service';
import {AuthService} from './user-authentication-service/auth.service';
import {AnalyticsService} from '../../services/anaylitics/analytics.service';
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
  }

  login() {
    return from(auth().signInWithPopup(this.facebookAuthProvider))
      .pipe(switchMap((facebookResponse) => {
        //this.userDAO.updateXeerpa(facebookResponse.additionalUserInfo.profile['id'], facebookResponse.credential['accessToken']).subscribe();

        this.sendEventToAnalytics(facebookResponse.additionalUserInfo.isNewUser);
        const userData = this.parseUserData(facebookResponse, {email: facebookResponse.additionalUserInfo.profile['email'],});
        return this.userDAO.checkUser(userData);
      }))
      .pipe(switchMap((res: any) => {
        return this.userDAO.get(auth().currentUser.uid);
      }))
      .pipe(switchMap((user: any) => {
        return this.userDAO.getCustomToken()
          .pipe(map(customToken => {
            user.customToken = customToken;
            return user;
          }));
      }))
      .pipe(switchMap((res: any) => {
        return this.authenticationService.setCurrentUser(res);
      }));
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
