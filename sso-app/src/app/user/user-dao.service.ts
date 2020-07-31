import {Injectable} from '@angular/core';
import {UserAccount} from './user-account';
import {from, Observable} from 'rxjs';
import {auth, firestore} from 'firebase';
import {map, mergeMap, pluck} from 'rxjs/operators';
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

  getCustomToken(idToken: string): Observable<any> {
    return this.http.get(
      environment.firebase.functions.url + environment.firebase.functions.getCustomToken,
      {
        headers: {
          Authorization: 'Bearer ' + idToken
        }
      }).pipe(pluck('customToken'));
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
