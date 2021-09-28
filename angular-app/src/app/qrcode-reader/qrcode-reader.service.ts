import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QrcodeReaderService {

  api: string = environment.firebase.functions.url;

  constructor(
    private http: HttpClient
  ) { }

  sendCode(bodyString: string): Observable<any> {
    const body = { content: bodyString };
    return this.http.post(
      this.api + environment.firebase.functions.redeem,
      body
    )
  }
}
