import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopsService {

  constructor(
    private http: HttpClient,
  ) { }

  getProduct(page): Observable<any>{
    return this.http.get(`${environment.drupal.url}${environment.drupal.promoPath}?page=${page}&type=product`)
  }

  getProductLocation(page, lat, lng): Observable<any> {
    return this.http.post(`${environment.firebase.functions.url}${environment.firebase.functions.getPromos}`, { latitude: lat, longitude: lng, radiusInM: 15000, pageLength: 10, pageNumber: `${page}`, type: 'Product' });
  }
}