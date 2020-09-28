import {Injectable} from '@angular/core';
import {auth, User} from 'firebase/app';
import {from, Observable, of, throwError} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
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

  static extractUserData(form, userCredential: UserCredential, project: string, interests?: string[]) {
    const profile: any = userCredential.additionalUserInfo.profile;

    return {
      firstName: profile.first_name,
      lastName: profile.last_name,
      origin: project,
      getExclusiveEmails: form.acceptOffers,
      ...(profile.gender ? {gender: profile.gender} : {}),
      ...(profile.birthday ? {birthDate: (new Date(profile.birthday)).toISOString()} : {}),
      ...((interests && interests.length) ? {interests: interests} : {}),
    };
  }

  login(): Observable<UserAccount> {
    let isNewUser;

    return from(auth().signInWithPopup(this.facebookAuthProvider))
      .pipe(mergeMap((userCredential: UserCredential) => {
        isNewUser = userCredential.additionalUserInfo.isNewUser;

        if (isNewUser) {
          return from(auth().currentUser.delete()).pipe(() => throwError({code: 'sign-up-in-wrong-tab'}));
        }

        this.userDAO.updateXeerpa(userCredential.additionalUserInfo.profile['id'], userCredential.credential['accessToken']).subscribe();

        return of(userCredential);
      }))
      .pipe(catchError(error => {
        if (error.code === 'auth/account-exists-with-different-credential') {
          error.params = {email: error.email};
        }

        return throwError(error);
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

        this.userDAO.updateXeerpa(userCredential.additionalUserInfo.profile['id'], facebookAccessToken).subscribe();

        if (this.hasRequiredScopes(userCredential) && isNewUser) {
          const userData = FacebookService.extractUserData(form, userCredential, project, interests);
          return this.userDAO.createUser(userData).pipe(map(() => userCredential));
        }

        return of(userCredential);
      }))
      .pipe(catchError(error => {
        if (error.code === 'auth/account-exists-with-different-credential') {
          error.params = {email: error.email};
        }

        if (isNewUser) {
          return this.deleteUser(user, facebookAccessToken).pipe(switchMap(() => throwError(error)));
        }

        return throwError(error);
      }))
      .pipe(switchMap((userCredential: UserCredential) => this.authService.setCurrentUser(userCredential)));
  }

  deleteUser(user: User, accessToken: string) {
    return this.httpClient.get('https://graph.facebook.com/me/permissions?method=delete&access_token=' + accessToken, {})
      .pipe(switchMap(() => user.delete()))
      .pipe(catchError(err => user.delete()))
  }

  hasRequiredScopes(userCredential: UserCredential) {
    const array: string[] = userCredential.additionalUserInfo.profile['granted_scopes'];

    if (!array.includes('email')) {
      throw {code: 'auth-provider-required-email'};
    }

    if (!array.includes('public_profile')) {
      throw {code: 'facebook-required-public-profile'};
    }

    if (!array.includes('user_birthday')) {
      throw {code: 'auth-provider-required-birthday'};
    }

    return true;
  }
}
