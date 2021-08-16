import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';
import firebase from 'firebase/app';
import 'firebase/auth';
import auth = firebase.auth;
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromosService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  // get drupal session
  getDrupalSession(): string {
    return this.cookieService.get('DRUPAL_SESSION');
  }

  // get headers
  getHeaders() {
    const drupalSession = this.getDrupalSession();
    return {
      headers:
      {
        'Authorization': `Bearer ${drupalSession}`
      }
    }

  }

  // get promotions data
  getPromos(page): Observable<any> {
    const headers = this.getHeaders()
    return this.http.get(`${environment.drupal.url}${environment.drupal.promoPath}?page=${page}&type=promotion`, headers)
  }

  // activate single promo
  activatePromo(id: string) {
    return from(auth().currentUser.getIdToken()).pipe(mergeMap(token => {
      return this.http.post(`${environment.firebase.functions.url}/v1/coupon-wallet/coupons/activate`, { couponId: id }, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
    }))
  }

}
