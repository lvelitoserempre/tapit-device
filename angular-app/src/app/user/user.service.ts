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
export class UserService {
  private currentUser: ReplaySubject<UserAccount>;

  constructor(private http: HttpClient) {
    this.currentUser = new ReplaySubject<UserAccount>(1);
  }

  setupLoggedUserObserver() {
    auth().onAuthStateChanged((user: User) => {
      if (user) {
        firestore().collection('user_account_tap').doc(user.uid).get()
          .then(userSnapshot => {
            this.currentUser.next({id: userSnapshot.id, ...userSnapshot.data()});
          });
      } else {
        this.currentUser.next(null);
      }
    });
  }

  getUser(userId: string): Observable<UserAccount> {
    return from(firestore().collection('user_account_tap').doc(userId).get())
      .pipe(map(documentSnapshot => {
        return {id: documentSnapshot.id, ...documentSnapshot.data()};
      }));
  }

  setCurrentUser(user: UserAccount) {
    this.currentUser.next(user);
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
    return from(auth().signInWithEmailAndPassword(email, password));
  }

  signUp(email: string, password: string): Observable<UserCredential> {
    return from(auth().createUserWithEmailAndPassword(email, password));
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
