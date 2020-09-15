import {Injectable} from '@angular/core';
import {auth} from 'firebase/app';
import {from, Observable, of, throwError} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {SignUpService} from './sign-up.service';
import {UserDAO} from '../user/user-dao.service';
import 'firebase/auth';
import {UserAccount} from '../user/user-account';
import {AuthService} from './auth.service';
import FacebookAuthProvider = auth.FacebookAuthProvider;
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class FacebookService {
  facebookAuthProvider: FacebookAuthProvider;

  constructor(private userDAO: UserDAO, private authService: AuthService) {
    this.facebookAuthProvider = new FacebookAuthProvider();
    //this.facebookAuthProvider.addScope('user_birthday');
  }

  login(): Observable<UserAccount> {
    let newUser;

    return from(auth().signInWithPopup(this.facebookAuthProvider))
      .pipe(mergeMap((userCredential: UserCredential) => {
        newUser = userCredential.additionalUserInfo.isNewUser;

        if (newUser) {
          return from(auth().currentUser.delete()).pipe(() => throwError({code: 'facebook-sign-up-in-wrong-tab'}));
        }

        return of(userCredential);
      }))
      .pipe(switchMap((userCredential: UserCredential) => this.authService.setCurrentUser(userCredential)));
  }

  signUp(form, project: string, interests?: string[]): Observable<UserAccount> {
    let newUser;

    return from(auth().signInWithPopup(this.facebookAuthProvider))
      .pipe(mergeMap((userCredential: UserCredential) => {
        newUser = userCredential.additionalUserInfo.isNewUser;

        if (newUser) {
          //this.userDAO.updateXeerpa(userCredential.additionalUserInfo.profile['id'], userCredential.credential['accessToken']).subscribe();

          const userData = SignUpService.extractFacebookUserData(form, userCredential, project, interests);
          return this.userDAO.createUser(userData).pipe(map(() => userCredential));
        }

        return of(userCredential);
      }))
      .pipe(catchError(err => {
        if (newUser) {
          auth().currentUser.delete().then((res) => console.log('user deleted', res));
        }

        return throwError(err);
      }))
      .pipe(switchMap((userCredential: UserCredential) => this.authService.setCurrentUser(userCredential)));
  }
}
