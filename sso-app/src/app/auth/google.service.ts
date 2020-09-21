import {Injectable} from '@angular/core';
import {UserDAO} from '../user/user-dao.service';
import {from, Observable, of, throwError} from 'rxjs';
import {auth} from 'firebase/app';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {UserAccount} from '../user/user-account';
import {AuthService} from './auth.service';
import {User} from 'firebase';
import {HttpClient} from '@angular/common/http';
import FacebookAuthProvider = auth.FacebookAuthProvider;
import UserCredential = auth.UserCredential;
import GoogleAuthProvider = auth.GoogleAuthProvider;

@Injectable({
  providedIn: 'root'
})
export class GoogleService {
  googleProvider: FacebookAuthProvider;

  constructor(private userDAO: UserDAO,
              private authService: AuthService,
              private httpClient: HttpClient) {
    this.googleProvider = new GoogleAuthProvider();
    this.googleProvider.addScope('https://www.googleapis.com/auth/user.birthday.read')
  }

  static extractUserData(form, userCredential: UserCredential, project: string, interests?: string[]) {
    const profile: any = userCredential.additionalUserInfo.profile;

    return {
      firstName: profile.given_name,
      lastName: profile.family_name,
      origin: project,
      getExclusiveEmails: form.acceptOffers,
      ...(profile.gender ? {gender: profile.gender} : {}),
      ...(profile.birthday ? {birthDate: (new Date(profile.birthday)).toISOString()} : {}),
      ...((interests && interests.length) ? {interests: interests} : {}),
    };
  }

  login(): Observable<UserAccount> {
    let isNewUser;

    return from(auth().signInWithPopup(this.googleProvider))
      .pipe(mergeMap((userCredential: UserCredential) => {
        isNewUser = userCredential.additionalUserInfo.isNewUser;

        if (isNewUser) {
          return from(auth().currentUser.delete()).pipe(() => throwError({code: 'sign-up-in-wrong-tab'}));
        }

        return of(userCredential);
      }))
      .pipe(switchMap((userCredential: UserCredential) => this.authService.setCurrentUser(userCredential)));
  }

  signUp(form, project: string, interests?: string[]): Observable<UserAccount> {
    let user: User;
    let accessToken: string;
    let isNewUser;

    return from(auth().signInWithPopup(this.googleProvider))
      .pipe(mergeMap((userCredential: UserCredential) => {
        user = userCredential.user;
        isNewUser = userCredential.additionalUserInfo.isNewUser;
        accessToken = userCredential.credential['accessToken'];
        console.log(userCredential)
        if (this.hasRequiredScopes(userCredential) && isNewUser) {
          const userData = GoogleService.extractUserData(form, userCredential, project, interests);
          //this.httpClient.get('https://www.googleapis.com/oauth2/v2/userinfo')
          return this.userDAO.createUser(userData).pipe(map(() => userCredential));
        }

        return of(userCredential);
      }))
      .pipe(catchError(error => {
        if (isNewUser) {
          return this.deleteUser(user, accessToken).pipe(switchMap(() => throwError(error)));
        }

        return throwError(error);
      }))
      .pipe(switchMap((userCredential: UserCredential) => this.authService.setCurrentUser(userCredential)));
  }

  deleteUser(user: User, accessToken: string) {
    return this.httpClient.get('https://accounts.google.com/o/oauth2/revoke?token=' + accessToken)
      .pipe(switchMap((res) => {
        console.log(res)
        return user.delete();
      }))
      .pipe(catchError(err => user.delete()))
  }

  hasRequiredScopes(userCredential: UserCredential) {
    const array: string[] = userCredential.additionalUserInfo.profile['granted_scopes'];

    if (!array.includes('https://www.googleapis.com/auth/user.birthday.read')) {
      throw {code: 'auth-provider-required-birthday'};
    }

    return true;
  }
}
