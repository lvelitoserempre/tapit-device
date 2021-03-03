import {Injectable} from '@angular/core';
import {from, Observable, ReplaySubject} from 'rxjs';
import {UserAccount} from '../user/user-account.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map, switchMap} from 'rxjs/operators';
import {UserDAO} from '../user/user-dao.service';
import {AnalyticsService} from '../services/anaylitics/analytics.service';
import {CookiesService} from '../../../../library/cookies.service';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import UserCredential = firebase.auth.UserCredential;
import auth = firebase.auth;
import User = firebase.User;
import firestore = firebase.firestore;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: ReplaySubject<UserAccount>;
  private cancelUserListener: () => void;

  constructor(private http: HttpClient, private userDAO: UserDAO, private analyticsService: AnalyticsService) {
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

  async setCurrentUser(user: UserAccount) {
    await this.addIdToken(user);
    this.currentUser.next(user);
    this.saveUserToACookie(user);

    return user;
  }

  async addIdToken(user: UserAccount) {
    if (auth().currentUser) {
      const token = await auth().currentUser.getIdToken();
      user.idToken = token;
      user.refreshToken = auth().currentUser.refreshToken;
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
      .pipe(switchMap(user => {
        return this.userDAO.getCustomToken()
          .pipe(map(customToken => {
            user.customToken = customToken;
            return user;
          }));
      }))
      .pipe(switchMap(user => {
        this.sendEventToAnalytics();
        return this.setCurrentUser(user);
      }));
  }

  signUp(email: string, password: string): Observable<UserCredential> {
    return from(auth().createUserWithEmailAndPassword(email, password));
  }

  private sendEventToAnalytics() {
    this.analyticsService.sendCustomEvent({
      hitType: 'event',
      eventCategory: 'login',
      eventAction: 'login-email'
    });
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