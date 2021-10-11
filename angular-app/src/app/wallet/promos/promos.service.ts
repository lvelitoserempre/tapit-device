import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PromosService {

  constructor(
    private http: HttpClient
  ) { }

  getPromosLocation(page, lat, lng): Observable<any> {
    return this.http.post(`${environment.firebase.functions.url}${environment.firebase.functions.getPromos}`, { latitude: lat, longitude: lng, radiusInM: 15000, pageLength: 10, pageNumber: `${page}`, type: 'Promotion' });
  }

  // get promotions data
  getPromos(page): Observable<any> {
    return this.http.get(`${environment.drupal.url}${environment.drupal.promoPath}?page=${page}&type=promotion`)
  }

  // activate single promo
  activatePromo(id: string) {
    return this.http.post(`${environment.firebase.functions.url}${environment.firebase.functions.activatePromo}`, { couponId: id });
  }

  // deativate promo
  deactivateCoupon(id: string) {
      return this.http.post(`${environment.firebase.functions.url}${environment.firebase.functions.deactivateCoupon}`, { couponId: id });
  }

}