import {Injectable} from '@angular/core';
import {forkJoin, from, Observable, of, ReplaySubject, throwError} from 'rxjs';
import {UserAccount} from '../user/user-account';
import {auth} from 'firebase/app';
import {HttpClient} from '@angular/common/http';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {UserDAO} from '../user/user-dao.service';
import {CookiesService} from '../../../../library/cookies.service';
import {SignUpService} from './sign-up.service';
import UserCredential = auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: ReplaySubject<UserAccount>;
  private cancelUserListener: () => void;

  constructor(private http: HttpClient, private userDAO: UserDAO) {
    this.currentUser = new ReplaySubject<UserAccount>(0);
  }

  setCurrentUser(userCredential?: UserCredential) {
    return this.getUserAccountData(userCredential)
      .pipe(tap(user => {
        this.currentUser.next(user);
        this.saveUserToACookie(user);
      }))
  }

  getUserAccountData(userCredential?: UserCredential) {
    if (userCredential) {
      const user: UserAccount = {
        refreshToken: userCredential.user.refreshToken,
      };

      return forkJoin({
        userData: this.userDAO.get(userCredential.user.uid),
        idToken: userCredential.user.getIdToken()
      })
        .pipe(switchMap(data => {
          Object.assign(user, data.userData)
          user.idToken = data.idToken;
          return this.userDAO.getCustomToken(data.idToken)
        }))
        .pipe(map(customToken => {
          user.customToken = customToken;
          return user;
        }))
    } else {
      return of(null);
    }
  }

  saveUserToACookie(user: UserAccount) {
    CookiesService.setObject('loggedUser', this.extractCookieData(user));
  }

  getCurrentUser() {
    return this.currentUser.asObservable();
  }

  logout(): Observable<void> {
    return from(auth().signOut())
      .pipe(switchMap(() => this.setCurrentUser(null)));
  }

  login(email: string, password: string): Observable<UserAccount> {
    return from(auth().signInWithEmailAndPassword(email, password))
      .pipe(switchMap((userCredential: UserCredential) => this.setCurrentUser(userCredential)));
  }

  signUp(formValue, config, interests): Observable<UserAccount> {
    return from(auth().createUserWithEmailAndPassword(formValue.email, formValue.password))
      .pipe(switchMap((userCredential: UserCredential) => {
        return this.userDAO.createUser(SignUpService.extractFormUserData(formValue, config.project, interests)).pipe(map(() => userCredential));
      }))
      .pipe(catchError(error => {

        if (auth().currentUser) {
          auth().currentUser.delete().then((res) => console.log('user deleted', res));
        }

        return throwError(error);
      }))
      .pipe(switchMap((userCredential: UserCredential) => this.setCurrentUser(userCredential)));
  }

  getRememberMeValue(): string {
    return CookiesService.getValue('rememberUser') || '';
  }

  setRememberMeValue(email: string) {
    CookiesService.setObject('rememberUser', email);
  }

  removeRememberMe() {
    CookiesService.setObject('rememberUser', '');
  }

  private extractCookieData(userAccount: UserAccount): any {
    return userAccount ? {
      id: userAccount.id,
      email: userAccount.email,
      firstName: userAccount.firstName || '',
      lastName: userAccount.lastName || '',
      points: userAccount.points || 0,
      idToken: userAccount.idToken,
      refreshToken: userAccount.refreshToken
    } : null;
  }
}
