import {Injectable} from '@angular/core';
import {from, Observable, ReplaySubject} from 'rxjs';
import {UserAccount} from '../models/user-account.model';
import {auth, firestore, User} from 'firebase';
import {map, mergeMap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: ReplaySubject<UserAccount>;
  private wasNewUserSigningUp = false;

  constructor(private http: HttpClient) {
    this.currentUser = new ReplaySubject<UserAccount>(0);
  }

  setupLoggedUserObserver() {
    auth().onAuthStateChanged((user: User) => {
      if (user) {
        if (!this.wasNewUserSigningUp) {
          this.getUser(user.uid).subscribe(userData => this.setCurrentUser(userData));
        }
      } else {
        this.setCurrentUser(null);
      }
    });
  }

  getUser(userId: string): Observable<UserAccount> {
    return from(firestore().collection('user_account_tap').doc(userId).get())
      .pipe(map(documentSnapshot => {
        return {id: documentSnapshot.id, ...documentSnapshot.data()};
      }));
  }

  async setCurrentUser(user: UserAccount) {
    await this.addIdToken(user);
    this.currentUser.next(user);
    this.saveUserToLocalStorage(user);
    this.saveUserToACookie(user);
  }

  async addIdToken(user: UserAccount) {
    if (auth().currentUser) {
      const token = await auth().currentUser.getIdToken();
      user.idToken = token;
    }
  }

  saveUserToLocalStorage(user: UserAccount) {
    if (user) {
      const userCopy = {...user};

      delete userCopy.referralCode;
      window.localStorage.setItem('user', JSON.stringify(userCopy));
    } else {
      window.localStorage.removeItem('user');
    }
  }

  saveUserToACookie(user: UserAccount) {
    if (user) {
      const userCopy = {...user};

      delete userCopy.referralCode;
      document.cookie = 'user=' + encodeURIComponent(JSON.stringify(userCopy)) + ';max-age=86400;domain=' +
        window.location.hostname; // + 'eldiablo.com.co';
      console.log(userCopy, document.cookie);
    } else {
      document.cookie = 'user=';
    }
  }

  setCurrentUserById(userId: string) {
    if (userId) {
      this.getUser(userId).subscribe(user => {
        this.currentUser.next(user);
      });
    } else {
      this.currentUser.next(null);
    }
  }

  getCurrentUser() {
    return this.currentUser.asObservable();
  }

  logout(): Observable<void> {
    return from(auth().signOut());
  }

  login(email: string, password: string): Observable<UserCredential> {
    return from(auth().signInWithEmailAndPassword(email, password))
      .pipe(map((userCredential: UserCredential) => {
        this.wasNewUserSigningUp = false;
        return userCredential;
      }));
  }

  signUp(email: string, password: string): Observable<UserCredential> {
    return from(auth().createUserWithEmailAndPassword(email, password))
      .pipe(map((userCredential: UserCredential) => {
        this.wasNewUserSigningUp = true;
        return userCredential;
      }));
  }

  checkExistentUser(user: UserAccount) {
    return from(auth().currentUser.getIdToken())
      .pipe(mergeMap(token =>
        this.http.post(
          environment.functions.url + '/' + environment.functions.checkExistentUser,
          user,
          {
            headers: {
              Authorization: 'Bearer ' + token,
              ab_data: auth().currentUser.uid
            }
          }
        )));
  }
}