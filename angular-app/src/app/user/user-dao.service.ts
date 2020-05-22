import {Injectable} from '@angular/core';
import {UserAccount} from '../models/user-account.model';
import {from, Observable} from 'rxjs';
import {auth, firestore} from 'firebase';
import {map, mergeMap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDAO {
  private collection = environment.firebase.collections.userAccount;

  constructor(private http: HttpClient) {
  }

  get(id: string): Observable<UserAccount> {
    return from(firestore().collection(environment.firebase.collections.userAccount).doc(id).get())
      .pipe(map(documentSnapshot => {
        return {id: documentSnapshot.id, ...documentSnapshot.data()};
      }));
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
}
