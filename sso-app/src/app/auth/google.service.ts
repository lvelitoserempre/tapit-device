import {Injectable} from '@angular/core';
import {UserDAO} from '../user/user-dao.service';
import {from, Observable, of, throwError} from 'rxjs';
import {auth} from 'firebase';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {SignUpService} from './sign-up.service';
import FacebookAuthProvider = auth.FacebookAuthProvider;
import UserCredential = auth.UserCredential;
import GoogleAuthProvider = auth.GoogleAuthProvider;

@Injectable({
  providedIn: 'root'
})
export class GoogleService {
  googleProvider: FacebookAuthProvider;

  constructor(private userDAO: UserDAO) {
    this.googleProvider = new GoogleAuthProvider();
  }

  login(): Observable<UserCredential> {
    let isNewUser;

    return from(auth().signInWithPopup(this.googleProvider))
      .pipe(mergeMap((userCredential: UserCredential) => {
        isNewUser = userCredential.additionalUserInfo.isNewUser;

        if (isNewUser) {
          return from(auth().currentUser.delete()).pipe(() => throwError({code: 'facebook-sign-up-in-wrong-tab'}));
        }

        return of(userCredential);
      }));
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
      }));
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
}
