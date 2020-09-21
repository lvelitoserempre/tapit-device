import {Injectable} from '@angular/core';
import {auth, User} from 'firebase/app';
import {from, Observable, of, throwError} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {SignUpService} from './sign-up.service';
import {UserDAO} from '../user/user-dao.service';
import 'firebase/auth';
import {UserAccount} from '../user/user-account';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import FacebookAuthProvider = auth.FacebookAuthProvider;
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class FacebookService {
  facebookAuthProvider: FacebookAuthProvider;

  constructor(private userDAO: UserDAO, private authService: AuthService, private httpClient: HttpClient) {
    this.facebookAuthProvider = new FacebookAuthProvider();
    this.facebookAuthProvider.addScope('user_birthday');
    this.facebookAuthProvider.addScope('email');
    this.facebookAuthProvider.addScope('public_profile');
    this.facebookAuthProvider.addScope('user_friends');
    this.facebookAuthProvider.addScope('user_gender');
    this.facebookAuthProvider.addScope('user_likes');
    this.facebookAuthProvider.addScope('user_location');
    this.facebookAuthProvider.addScope('user_posts');
  }

  login(): Observable<UserAccount> {
    let isNewUser;

    return from(auth().signInWithPopup(this.facebookAuthProvider))
      .pipe(mergeMap((userCredential: UserCredential) => {
        let user = userCredential.user;
        isNewUser = userCredential.additionalUserInfo.isNewUser;
        let facebookAccessToken = userCredential.credential['accessToken'];

        if (isNewUser) {
          return from(auth().currentUser.delete()).pipe(() => throwError({code: 'sign-up-in-wrong-tab'}));
        }

        return of(userCredential);
      }))
      .pipe(switchMap((userCredential: UserCredential) => this.authService.setCurrentUser(userCredential)));
  }

  signUp(form, project: string, interests?: string[]): Observable<UserAccount> {
    let user: User;
    let facebookAccessToken: string;
    let isNewUser;

    return from(auth().signInWithPopup(this.facebookAuthProvider))
      .pipe(mergeMap((userCredential) => {
        user = userCredential.user;
        isNewUser = userCredential.additionalUserInfo.isNewUser;
        facebookAccessToken = userCredential.credential['accessToken'];

        if (this.hasRequiredScopes(userCredential) && isNewUser) {
          this.userDAO.updateXeerpa(userCredential.additionalUserInfo.profile['id'], userCredential.credential['accessToken']).subscribe();

          const userData = SignUpService.extractFacebookUserData(form, userCredential, project, interests);
          return this.userDAO.createUser(userData).pipe(map(() => userCredential));
        }

        return of(userCredential);
      }))
      .pipe(catchError(error => {
        if (isNewUser) {
          return this.deleteUser(user, facebookAccessToken).pipe(switchMap(() => throwError(error)));
        }

        return throwError(error);
      }))
      .pipe(switchMap((userCredential: UserCredential) => this.authService.setCurrentUser(userCredential)));
  }

  deleteUser(user: User, facebookAccessToken: string) {
    return this.httpClient.get('https://graph.facebook.com/me/permissions?method=delete&access_token=' + facebookAccessToken, {})
      .pipe(switchMap(() => user.delete()))
      .pipe(catchError(err => user.delete()))
  }

  hasRequiredScopes(userCredential: UserCredential) {
    const array: string[] = userCredential.additionalUserInfo.profile['granted_scopes'];

    if (!array.includes('email')) {
      throw {code: 'facebook-required-email'};
    }

    if (!array.includes('public_profile')) {
      throw {code: 'facebook-required-public-profile'};
    }

    if (!array.includes('user_birthday')) {
      throw {code: 'facebook-required-user-birthday'};
    }

    return true;
  }
}
