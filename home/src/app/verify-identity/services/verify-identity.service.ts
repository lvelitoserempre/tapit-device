import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerifyIdentityService {

  api: string = environment.firebase.functions.url;

  constructor(
    private _http: HttpClient
  ) { }

  verifyDocument(token: string): Observable<any> {
    return this._http.get(`${this.api}/v1/user/has-identity`, { headers: this.getHeaders(token) }).pipe(map((res: any) => {
      console.log(res);
    }));
  }

  updateDocument(form: any, token: string): Observable<any> {
    const {identity, identityType} = form;
    return this._http.put(`${this.api}/v1/user`, {identity, identityType}, { headers: this.getHeaders(token) }).pipe(map((res: any) => {
      return res;
    }));
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
