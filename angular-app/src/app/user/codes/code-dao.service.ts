import {Injectable} from '@angular/core';
import {from, Observable, of} from 'rxjs';
import {auth, firestore} from 'firebase';
import {map, mergeMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import Code from './codes';

@Injectable({
  providedIn: 'root'
})
export class CodeDAO {
  
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Code[]> {
    return from(auth().currentUser.getIdToken())
      .pipe(mergeMap(token =>
        this.http.get(
          environment.firebase.functions.url + environment.firebase.functions.getAllCodes,
          {
            headers: {
              Authorization: 'Bearer ' + token,
              ab_data: auth().currentUser.uid
            }
          }
        )))
        .pipe(map((objects: any[]) => {
          const codes: Code[] = [];

          for (const object of objects) {
            codes.push({ 
              name: object.commercialEstablishment.name, 
              amount: object.amount,
              expireDate: new Date(object.validTo),
              image: object.commercialEstablishment.icon,
              tags: object.tags,
              qrCodeUrl: object.qrCodeUrl,
              description: object.description
             });
          }
          return codes;
        }));
  }
}
