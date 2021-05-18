import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  api: string = environment.firebase.functions.url;

  constructor(
    private _http: HttpClient
  ) {}

  getTransactions(token: any): Observable<any> {
    return this._http.get(`${this.api}/v2/user/point-transactions`, { headers: this.getHeaders(token) }).pipe(map((res: any) => {
      return res.data;
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
