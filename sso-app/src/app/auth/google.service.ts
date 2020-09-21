import {Injectable} from '@angular/core';
import {UserDAO} from '../user/user-dao.service';
import {from, Observable, of, throwError} from 'rxjs';
import {auth} from 'firebase/app';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {UserAccount} from '../user/user-account';
import {AuthService} from './auth.service';
import FacebookAuthProvider = auth.FacebookAuthProvider;
import UserCredential = auth.UserCredential;
import GoogleAuthProvider = auth.GoogleAuthProvider;

@Injectable({
  providedIn: 'root'
})
export class GoogleService {
  googleProvider: FacebookAuthProvider;

  constructor(private userDAO: UserDAO,
              private authService: AuthService) {
    this.googleProvider = new GoogleAuthProvider();
  }

  static extractUserData(form, userCredential: UserCredential, project: string, interests?: string[]) {
    const profile: any = userCredential.additionalUserInfo.profile;

    if (!profile.email) {
      throw {code: 'facebook-not-authorized-email'};
    }

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

  signUp(form, project: string, interests?: string[]): Observable<UserCredential> {
    let isNewUser;

    return from(auth().signInWithPopup(this.googleProvider))
      .pipe(mergeMap((userCredential: UserCredential) => {
        isNewUser = userCredential.additionalUserInfo.isNewUser;

        if (isNewUser) {
          const userData = GoogleService.extractUserData(form, userCredential, project, interests);
          return this.userDAO.createUser(userData).pipe(map(() => userCredential));
        }

        return of(userCredential);
      }))
      .pipe(catchError(err => {
        if (isNewUser) {
          auth().currentUser.delete().then((res) => console.log('user deleted', res));
        }

        return throwError(err);
      }))
      .pipe(switchMap((userCredential: UserCredential) => this.authService.setCurrentUser(userCredential)));
  }
}
