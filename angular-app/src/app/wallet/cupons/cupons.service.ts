import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import firebase from 'firebase/app';
import { CookieService } from 'ngx-cookie';
import 'firebase/auth';
import auth = firebase.auth;

@Injectable({
  providedIn: 'root'
})
export class CuponsService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getCoupons(token): Observable<any> {
      return this.http.post(`${environment.firebase.functions.url}${environment.firebase.functions.getCoupons}`, { pageLength: 10, pageNumber: 1 }, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }

  deactivateCoupons(token:string ,id:string ): Observable<any> {
    return this.http.post(`${environment.firebase.functions.url}${environment.firebase.functions.deactivateCoupon}`, { couponId: id }, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  });
}
}
