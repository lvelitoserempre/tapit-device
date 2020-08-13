import {Injectable} from '@angular/core';
import {from, Observable, ReplaySubject} from 'rxjs';
import {UserAccount} from '../user/user-account';
import {auth, firestore, User} from 'firebase';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map, switchMap, tap} from 'rxjs/operators';
import {UserDAO} from '../user/user-dao.service';
import {CookiesService} from '../../../../library/cookies.service';
import {LoaderService} from '../loader/loader-service/loader.service';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: ReplaySubject<UserAccount>;
  private cancelUserListener: () => void;

  constructor(private http: HttpClient, private userDAO: UserDAO,
              private loaderService: LoaderService) {
    this.currentUser = new ReplaySubject<UserAccount>(0);
  }

  setupLoggedUserObserver() {
    auth().onAuthStateChanged((user: User) => {
      if (user && !this.cancelUserListener) {
        this.cancelUserListener = firestore().collection(environment.firebase.collections.userAccount).doc(user.uid)
          .onSnapshot(snapshot => {
            this.setCurrentUser(UserDAO.snapshotToUser(snapshot));
          });
      } else {
        if (this.cancelUserListener) {
          this.cancelUserListener();
        }

        this.cancelUserListener = null;
        this.setCurrentUser(null);
      }
    });
  }

  setCurrentUser(user: UserAccount) {
    if (auth().currentUser) {
      from(auth().currentUser.getIdToken())
        .pipe(switchMap(idToken => {
          user.idToken = idToken;
          user.refreshToken = auth().currentUser.refreshToken;

          return this.userDAO.getCustomToken(idToken)
        }))
        .subscribe(customToken => {
          user.customToken = customToken;
          this.currentUser.next(user);
          this.saveUserToACookie(user);
          this.loaderService.hide();
        })
    } else {
      this.currentUser.next(null);
      this.saveUserToACookie(null);
    }
  }

  saveUserToACookie(user: UserAccount) {
    CookiesService.setObject('loggedUser', this.extractCookieData(user));
  }

  getCurrentUser() {
    return this.currentUser.asObservable();
  }

  logout(): Observable<void> {
    return from(auth().signOut()).pipe(map(() => {
      CookiesService.setObject('loggedUser', null);
    }));
  }

  login(email: string, password: string): Observable<UserAccount> {
    return from(auth().signInWithEmailAndPassword(email, password))
      .pipe(switchMap((userCredential: UserCredential) => {
        return this.userDAO.get(userCredential.user.uid);
      }))
      .pipe(tap(user => {
        this.setCurrentUser(user);
      }));
  }

  signUp(email: string, password: string): Observable<UserCredential> {
    return from(auth().createUserWithEmailAndPassword(email, password));
  }

  private extractCookieData(data: UserAccount): any {
    return data ? {
      id: data.id,
      email: data.email,
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      points: data.points || 0,
      idToken: data.idToken,
      refreshToken: data.refreshToken
    } : null;
  }
}
