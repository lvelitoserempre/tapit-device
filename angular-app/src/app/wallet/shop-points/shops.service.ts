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
}