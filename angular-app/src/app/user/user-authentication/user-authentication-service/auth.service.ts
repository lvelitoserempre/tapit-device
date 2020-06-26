import {Injectable} from '@angular/core';
import {from, Observable, ReplaySubject} from 'rxjs';
import {UserAccount} from '../../../models/user-account.model';
import {auth, firestore, User} from 'firebase';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {switchMap} from 'rxjs/operators';
import {UserDAO} from '../../user-dao.service';
import {AnalyticsService} from '../../../services/anaylitics/analytics.service';
import UserCredential = firebase.auth.UserCredential;

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
    this.saveUserToLocalStorage(user);
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

  saveUserToLocalStorage(user: UserAccount) {
    if (user) {
      window.localStorage.setItem('user', this.extractBasicData(user));
    } else {
      window.localStorage.removeItem('user');
    }
  }

  saveUserToACookie(user: UserAccount) {
    if (user) {
      document.cookie = 'loggedUser=' + encodeURIComponent(this.extractBasicData(user)) + ';max-age=31536000;path=/;domain=tapit.com.co';
    } else {
      document.cookie = 'loggedUser=;max-age=0;path=/;domain=tapit.com.co';
    }
  }

  getCurrentUser() {
    return this.currentUser.asObservable();
  }

  logout(): Observable<void> {
    return from(auth().signOut());
  }

  login(email: string, password: string): Observable<UserAccount> {
    return from(auth().signInWithEmailAndPassword(email, password))
      .pipe(switchMap((user: UserCredential) => {
        return this.userDAO.get(user.user.uid);
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

  private extractBasicData(data: UserAccount): string {
    return JSON.stringify({
      id: data.id,
      email: data.email,
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      points: data.points || 0,
      idToken: data.idToken,
      refreshToken: data.refreshToken
    });
  }
}
