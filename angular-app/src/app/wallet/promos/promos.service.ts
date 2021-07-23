import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PromosService {

  constructor( private http: HttpClient, private cookieService: CookieService ) { }

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
   getPromos(page): Observable<any>{
    const headers = this.getHeaders()
    return this.http.get(`${environment.drupal.url}${environment.drupal.promoPath}?page=${page}`, headers)
  }

}
