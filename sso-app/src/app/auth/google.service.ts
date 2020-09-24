import {Injectable} from '@angular/core';
import {UserDAO} from '../user/user-dao.service';
import {from, Observable, of, throwError} from 'rxjs';
import {auth} from 'firebase/app';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {UserAccount} from '../user/user-account';
import {AuthService} from './auth.service';
import {User} from 'firebase';
import {HttpClient} from '@angular/common/http';
import AgeValidatorService from './age-validator.service';
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
    this.googleProvider.addScope('https://www.googleapis.com/auth/user.birthday.read');
  }

  static createEntity(form, userCredential: UserCredential, project: string, birthDate: Date, interests?: string[]) {
    const profile: any = userCredential.additionalUserInfo.profile;

    return {
      firstName: profile.given_name,
      lastName: profile.family_name,
      origin: project,
      getExclusiveEmails: form.acceptOffers,
      birthDate: birthDate.toISOString(),
      ...((interests && interests.length) ? {interests: interests} : {}),
    };
  }

  login(): Observable<UserAccount> {
    let email;
    let isNewUser;

    return from(auth().signInWithPopup(this.googleProvider))
      .pipe(mergeMap((userCredential: UserCredential) => {
        email = userCredential.user.email
        isNewUser = userCredential.additionalUserInfo.isNewUser;

        if (isNewUser) {
          return from(auth().currentUser.delete()).pipe(() => throwError({code: 'sign-up-in-wrong-tab'}));
        }

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
    let accessToken: string;
    let isNewUser;

    return from(auth().signInWithPopup(this.googleProvider))
      .pipe(mergeMap((userCredential: UserCredential) => {
        user = userCredential.user;
        isNewUser = userCredential.additionalUserInfo.isNewUser;
        accessToken = userCredential.credential['accessToken'];

        if (this.hasRequiredScopes(userCredential) && isNewUser) {
          return this.getGoogleBirthDate(accessToken)
            .pipe(map(birthDate => {
              if (!birthDate) {
                throw {code: 'auth-provider-incomplete-birthday'};
              }

              if (!AgeValidatorService.olderThan(birthDate, 18)) {
                throw {code: 'user-under-legal-age'};
              }

              return GoogleService.createEntity(form, userCredential, project, birthDate, interests);
            }))
            .pipe(switchMap(entity => this.userDAO.createUser(entity)))
            .pipe(map(() => userCredential));
        }

        return of(userCredential);
      }))
      .pipe(catchError(error => {
        if (error.code === 'auth/account-exists-with-different-credential') {
          error.params = {email: error.email};
        }

        if (isNewUser) {
          return this.deleteUser(user, accessToken).pipe(switchMap(() => throwError(error)));
        }

        return throwError(error);
      }))
      .pipe(switchMap((userCredential: UserCredential) => this.authService.setCurrentUser(userCredential)));
  }

  deleteUser(user: User, accessToken: string) {
    return this.httpClient.get('https://accounts.google.com/o/oauth2/revoke?token=' + accessToken)
      .pipe(switchMap((res) => user.delete()))
      .pipe(catchError(err => user.delete()))
  }

  hasRequiredScopes(userCredential: UserCredential) {
    const array: string[] = userCredential.additionalUserInfo.profile['granted_scopes'];

    if (!array.includes('https://www.googleapis.com/auth/user.birthday.read')) {
      throw {code: 'auth-provider-required-birthday'};
    }

    return true;
  }

  getGoogleBirthDate(accessToken) {
    const url = 'https://people.googleapis.com/v1/people/me?personFields=birthdays&access_token=' + accessToken;
    return this.httpClient.get(url)
      .pipe(map((res: { birthdays: [] }) => {
        return this.getValidDate(res.birthdays);
      }));
  }

  getValidDate(birthDates: { date: { year: number, month: number, day: number } }[]) {
    for (const birthDate of birthDates) {
      if (birthDate.date.year != null && birthDate.date.month != null && birthDate.date.day != null) {
        return new Date(birthDate.date.year, birthDate.date.month - 1, birthDate.date.day);
      }
    }
  }
}
