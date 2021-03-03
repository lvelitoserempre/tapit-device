import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {environment} from '../environments/environment';
import {UserDAO} from './user/user-dao.service';
import {UserAccount} from './user/user-account.model';
import auth = firebase.auth;
import firestore = firebase.firestore;

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService extends Subject<UserAccount> {

  constructor() {
    super();

    auth().onAuthStateChanged(user => {
      if (user) {
        firestore().collection(environment.firebase.collections.userAccount).doc(user.uid)
          .onSnapshot(snapshot => {
            this.next(UserDAO.snapshotToUser(snapshot));
          })
      } else {
        this.next({firstName: '', lastName: ''});
      }
    })
  }
}
