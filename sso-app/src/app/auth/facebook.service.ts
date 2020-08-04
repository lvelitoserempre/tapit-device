import {Injectable} from '@angular/core';
import {auth} from 'firebase';
import {from, Observable, of, throwError} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';
import {SignUpService} from './sign-up.service';
import {UserDAO} from '../user/user-dao.service';
import FacebookAuthProvider = auth.FacebookAuthProvider;
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class FacebookService {
  facebookAuthProvider: FacebookAuthProvider;

  constructor(private userDAO: UserDAO) {
    this.facebookAuthProvider = new FacebookAuthProvider();
    this.facebookAuthProvider.addScope('user_birthday');
  }

  login(): Observable<any> {
    let newUser;

    return from(auth().signInWithPopup(this.facebookAuthProvider))
      .pipe(mergeMap((userCredential: UserCredential) => {
        newUser = userCredential.additionalUserInfo.isNewUser;

        if (newUser) {
          return from(auth().currentUser.delete()).pipe(() => throwError({code: 'facebook-sign-up-in-wrong-tab'}));
        }

        return of(userCredential);
      }));
  }

  signIn(project: string, interests?: string[]): Observable<any> {
    let newUser;

    return from(auth().signInWithPopup(this.facebookAuthProvider))
      .pipe(mergeMap((userCredential: UserCredential) => {
        newUser = userCredential.additionalUserInfo.isNewUser;

        if (newUser) {
          const userData = SignUpService.extractFacebookUserData(userCredential, project, interests);
          return this.userDAO.createUser(userData)
        }

        return of();
      }))
      .pipe(catchError(err => {
        if (newUser) {
          auth().currentUser.delete().then((res) => console.log('user deleted', res));
        }

        return throwError(err);
      }));
  }
}
