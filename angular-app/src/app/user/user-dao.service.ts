import {Injectable} from '@angular/core';
import {UserAccount} from './user-account.model';
import {from, Observable} from 'rxjs';
import {map, mergeMap, pluck, switchMap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import firestore = firebase.firestore;
import auth = firebase.auth;
import DocumentSnapshot = firestore.DocumentSnapshot;
import DocumentReference = firestore.DocumentReference;
import Timestamp = firestore.Timestamp;
import DocumentData = firebase.firestore.DocumentData;

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

  getCustomToken(): Observable<string> {
    return from(auth().currentUser.getIdToken())
      .pipe(switchMap(token =>
        this.http.get(
          environment.firebase.functions.url + environment.firebase.functions.getCustomToken,
          {
            headers: {
              Authorization: 'Bearer ' + token
            }
          }
        )))
      .pipe(pluck('customToken'));
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
