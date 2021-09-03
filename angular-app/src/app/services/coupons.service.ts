import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  constructor(
    private http: HttpClient
  ) { }

  // get my coupons
  getCoupons(page): Observable<any>{
    return this.http.get(`${environment.drupal.url}${environment.drupal.promoPath}?page=${page}`)
  }
}