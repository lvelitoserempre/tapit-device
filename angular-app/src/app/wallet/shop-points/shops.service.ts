import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';
import firebase from 'firebase/app';
import 'firebase/auth';
import auth = firebase.auth;
import { mergeMap } from 'rxjs/operators';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopsService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  getDrupalSession(): string {
    return this.cookieService.get('DRUPAL_SESSION');
  }

  getHeaders() {
    const drupalSession = this.getDrupalSession();
    return {
      headers:
      {
        'Authorization': `Bearer ${drupalSession}`
      }
    }
  }

  getProduct(page): Observable<any>{
    const headers = this.getHeaders()
    return this.http.get(`${environment.drupal.url}${environment.drupal.promoPath}?page=${page}&type=product`, headers)
  }

}
