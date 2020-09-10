import {Injectable} from '@angular/core';
import {auth} from 'firebase';
import {from, Observable, of, throwError} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
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
    //this.facebookAuthProvider.addScope('user_birthday');
  }

  login(): Observable<UserCredential> {
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

  signUp(form, project: string, interests?: string[]): Observable<UserCredential> {
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
      }));
  }
}
