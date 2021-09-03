import {EventEmitter, Injectable} from '@angular/core';
import {from, Observable, ReplaySubject} from 'rxjs';
import {UserAccount} from '../user/user-account.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map, switchMap} from 'rxjs/operators';
import {UserDAO} from '../user/user-dao.service';
import {AnalyticsService} from '../services/anaylitics/analytics.service';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import UserCredential = firebase.auth.UserCredential;
import auth = firebase.auth;
import User = firebase.User;
import firestore = firebase.firestore;
import { __assign } from 'tslib';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public tokenCustom: string = null;
  public token$ = new EventEmitter;
  private currentUser: ReplaySubject<UserAccount>;
  private cancelUserListener: () => void;

  constructor(
    private userDAO: UserDAO,
    private analyticsService: AnalyticsService,
    private cookieService: CookieService
  ) {
    this.observerToken();
    this.currentUser = new ReplaySubject<UserAccount>(0);
  }

  setupLoggedUserObserver() {
    auth().onAuthStateChanged((user: User) => {
      if (user && !this.cancelUserListener) {
        this.cancelUserListener = firestore().collection(environment.firebase.collections.userAccount).doc(user.uid)
          .onSnapshot(async(snapshot) => {
            const res = await this.setCurrentUser(UserDAO.snapshotToUser(snapshot));
            this.token$.emit(res.idToken);
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
    this.cookieService.put('loggedUser', this.extractCookieData(user), {});
  }

  getCurrentUser() {
    return this.currentUser.asObservable();
  }

  logout(): Observable<void> {
    return from(auth().signOut()).pipe(map(() => {
      this.cookieService.remove('__session');
      this.cookieService.remove('loggedUser');
      this.cookieService.remove('DRUPAL_SESSION');
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

  private extractCookieData(user: UserAccount): any {
    return user ? {
      id: user.id,
      email: user.email,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      points: user.points || 0,
      idToken: user.idToken,
      refreshToken: user.refreshToken,
      uid: user.uid
    } : null;
  }
  observerToken() {
    this.token$.subscribe(token => {
      this.tokenCustom = token;
    });
  }

  getDrupalAuthCookie(): string {
    return this.cookieService.get('DRUPAL_SESSION');
  }
}
