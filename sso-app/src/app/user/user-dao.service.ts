import {Injectable} from '@angular/core';
import {UserAccount} from './user-account';
import {from, Observable} from 'rxjs';
import {auth, firestore} from 'firebase/app';
import {map, mergeMap, pluck} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import 'firebase/firestore';
import DocumentReference = firestore.DocumentReference;
import DocumentData = firestore.DocumentData;
import DocumentSnapshot = firestore.DocumentSnapshot;
import Timestamp = firestore.Timestamp;

@Injectable({
  providedIn: 'root'
})
export class UserDAO {
  private collection = environment.firebase.collections.userAccount;

  constructor(private http: HttpClient) {
  }

  static snapshotToUser(documentSnapshot: DocumentSnapshot): UserAccount {
    let object: DocumentData = {};

    if (documentSnapshot) {
      object = documentSnapshot.data() || {};
      object.id = documentSnapshot.id;

      for (const objectKey in object) {
        if (object.hasOwnProperty(objectKey)) {
          if (object[objectKey] instanceof Timestamp) {
            object[objectKey] = object[objectKey].toDate()
          }

          if (object[objectKey] instanceof DocumentReference) {
            object[objectKey] = object[objectKey].id;
          }
        }
      }
    }

    return object;
  }

  get(id: string): Observable<UserAccount> {
    return from(firestore().collection(this.collection).doc(id).get())
      .pipe(map(documentSnapshot => UserDAO.snapshotToUser(documentSnapshot)));
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


  updateXeerpa(providerId, providerToken) {
    return from(auth().currentUser.getIdToken())
      .pipe(mergeMap(token =>
        this.http.post(
          environment.firebase.functions.url + environment.firebase.functions.xeerpa,
          {
            'provider': 'FB',
            'origin': 'web',
            'providerID': providerId,
            'providerToken': providerToken
          },
          {
            headers: {
              Authorization: 'Bearer ' + token,
            }
          }
        )));
  }
}
