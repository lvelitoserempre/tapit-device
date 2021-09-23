import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import firestore = firebase.firestore;
import auth = firebase.auth;
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QrcodeReaderService {

  api: string = environment.firebase.functions.url;

  constructor(
    private http: HttpClient
  ) { }

  sendCode(bodyString: string): Observable<any> {
    let body = { content: bodyString };
    return from(auth().currentUser.getIdToken())
      .pipe(mergeMap(token =>
        this.http.post(
          this.api + environment.firebase.functions.redeem,
          body,
          {
            headers:
              this.getHeaders(token)
          }
        )));
  }

  getHeaders(token: any): HttpHeaders {
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return headers;
  }
}
