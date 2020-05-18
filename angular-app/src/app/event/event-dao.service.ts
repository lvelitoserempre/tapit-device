import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventDAO {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any[]> {
    return this.http.get(environment.firebase.functions.url + environment.firebase.functions.getAllEvents)
      .pipe(map((res: any) => res.data));
  }
}
