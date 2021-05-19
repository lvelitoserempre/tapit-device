import {Injectable} from '@angular/core';
import {UserAccount} from './user-account';
import {from, Observable} from 'rxjs';
import {map, mergeMap, pluck} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import firebase from 'firebase/app';
import 'firebase/firestore';
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import DocumentData = firebase.firestore.DocumentData;
import firestore = firebase.firestore;
import auth = firebase.auth;
import DocumentReference = firebase.firestore.DocumentReference;
import Timestamp = firebase.firestore.Timestamp;

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
            object[objectKey] = object[objectKey].toDate();
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

  getCustomToken(idToken: string): Observable<string> {
    return this.http.get(
      environment.firebase.functions.url + environment.firebase.functions.getCustomToken,
      {
        headers: {
          Authorization: 'Bearer ' + idToken
        }
      }).pipe(pluck('customToken'));
  }


  updateXeerpa(providerId:any, providerToken:any) {
    return from(auth().currentUser.getIdToken())
      .pipe(mergeMap(token =>
        this.http.post(
          environment.firebase.functions.url + environment.firebase.functions.xeerpa,
          {
            provider: 'FB',
            origin: 'web',
            providerID: providerId,
            providerToken
          },
          {
            headers: {
              Authorization: 'Bearer ' + token,
            }
          }
        )));
  }

  createUser(userAccount: UserAccount): Observable<string> {
    return this.http.post(environment.firebase.functions.url + environment.firebase.functions.register, userAccount)
      .pipe(pluck('data'));
  }

  signInWith(provider: string, accessTokenOrPassword: string, origin: string, email?: string, acceptTerms?: boolean, acceptOffers?: boolean,
             interests?:any): Observable<string> {
    const entity: any = {
      provider,
      origin,
      credential: accessTokenOrPassword
    };

    if (email != null) {
      entity.email = email;
    }

    if (acceptTerms != null) {
      entity.termsAndConditions = acceptTerms;
    }

    if (acceptOffers != null) {
      entity.getExclusiveEmails = acceptOffers;
    }

    /*if (interests && interests.length) {
      entity.additionalData = {interests};
    }*/

    return this.http.post(environment.firebase.functions.url + environment.firebase.functions.auth, entity)
      .pipe(pluck('data'));
  }
}
