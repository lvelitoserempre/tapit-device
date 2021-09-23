import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PocMapService {

  constructor(private http: HttpClient) { }

  getPocs(lat:number, long:number, promId:string, radius: number): Observable<any> {
    return this.http.post(`${environment.firebase.functions.url}${environment.firebase.functions.getPocs}`, { latitude: lat, promotionId: promId, longitude: long, radiusInM: radius, pageLength: 0, pageNumber: 0,  });
  }
}
