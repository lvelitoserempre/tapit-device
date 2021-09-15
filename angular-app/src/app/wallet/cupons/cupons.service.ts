import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CuponsService {

  constructor(private http: HttpClient) { }

  getCoupons(pageNumber): Observable<any> {
    return this.http.post(`${environment.firebase.functions.url}${environment.firebase.functions.getCoupons}`, { pageLength: 10, pageNumber: `${pageNumber}` });
  }

  deactivateCoupons(id:string ): Observable<any> {
    return this.http.post(`${environment.firebase.functions.url}${environment.firebase.functions.deactivateCoupon}`, { couponId: id });
  }
}
