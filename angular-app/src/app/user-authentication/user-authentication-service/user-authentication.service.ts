import {Injectable} from '@angular/core';
import {from, Observable, ReplaySubject} from 'rxjs';
import {UserAccount} from '../../models/user-account.model';
import {auth, firestore, User} from 'firebase';
import {map, mergeMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {
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
    return from(firestore().collection(environment.firebase.collections.userAccount).doc(userId).get())
      .pipe(map(documentSnapshot => {
        return {id: documentSnapshot.id, ...documentSnapshot.data()};
      }));
  }

  async setCurrentUser(user: UserAccount) {
    await this.addIdToken(user);
    this.currentUser.next(user);

    const userCopy = {...user};
    delete userCopy.referralCode;
    this.saveUserToLocalStorage(userCopy);
    this.saveUserToACookie(userCopy);
  }

  async addIdToken(user: UserAccount) {
    if (auth().currentUser) {
      const token = await auth().currentUser.getIdToken();
      user.idToken = token;
    }
  }

  saveUserToLocalStorage(user: UserAccount) {
    if (user) {
      window.localStorage.setItem('user', JSON.stringify(user));
    } else {
      window.localStorage.removeItem('user');
    }
  }

  saveUserToACookie(user: UserAccount) {
    if (user) {
      document.cookie = 'loggedUser=' + encodeURIComponent(JSON.stringify(user)) + ';max-age=86400;path=/;domain=tapit.com.co';
    } else {
      document.cookie = 'loggedUser=;max-age=0;path=/;domain=tapit.com.co';
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
          environment.firebase.functions.url + environment.firebase.functions.checkExistentUser,
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
