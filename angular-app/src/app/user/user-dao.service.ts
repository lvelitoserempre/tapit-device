import {Injectable} from '@angular/core';
import {UserAccount} from '../models/user-account.model';
import {from, Observable} from 'rxjs';
import {auth, firestore} from 'firebase';
import {map, mergeMap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import DocumentSnapshot = firestore.DocumentSnapshot;

@Injectable({
  providedIn: 'root'
})
export class UserDAO {
  private collection = environment.firebase.collections.userAccount;

  constructor(private http: HttpClient) {
  }


  static snapshotToUser(documentSnapshot: DocumentSnapshot): UserAccount {
    const user: UserAccount = {id: documentSnapshot.id, ...documentSnapshot.data()};

    user.referralCode = user.referralCode ? user.referralCode.id : '';

    return user;
  }

  get(id: string): Observable<UserAccount> {
    return from(firestore().collection(this.collection).doc(id).get())
      .pipe(map(documentSnapshot => UserDAO.snapshotToUser(documentSnapshot)));
  }

  checkUser(user: UserAccount) {
    return from(auth().currentUser.getIdToken())
      .pipe(mergeMap(token =>
        this.http.post(
          environment.firebase.functions.url + environment.firebase.functions.checkUser,
          user,
          {
            headers: {
              Authorization: 'Bearer ' + token,
              ab_data: auth().currentUser.uid
            }
          }
        )));
  }

  getCustomToken() {
    return from(auth().currentUser.getIdToken())
      .pipe(mergeMap(token =>
        this.http.get(
          environment.firebase.functions.url + environment.firebase.functions.getCustomToken,
          {
            headers: {
              Authorization: 'Bearer ' + token
            }
          }
        )));
  }

  createUser(user: UserAccount) {
    return from(auth().currentUser.getIdToken())
      .pipe(mergeMap(token =>
        this.http.post(
          environment.firebase.functions.url + environment.firebase.functions.createUser,
          user,
          {
            headers: {
              Authorization: 'Bearer ' + token,
            }
          }
        )));
  }
}
