import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // get my coupons
  getCoupons(page): Observable<any>{
    const headers = this.getHeaders()
    return this.http.get(`${environment.drupal.url}${environment.drupal.promoPath}?page=${page}`, headers)
  }

  // get headers
  getHeaders() {
    const drupalSession = this.authService.getDrupalAuthCookie();
    return {
      headers:
      {
        'Authorization': `Bearer ${drupalSession}`
      }
    }
  }

  }
