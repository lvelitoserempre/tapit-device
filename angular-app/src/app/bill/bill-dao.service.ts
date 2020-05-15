import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {from} from 'rxjs';
import {auth} from 'firebase';
import {mergeMap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillDAO {
  constructor(private http: HttpClient) {
  }

  saveBill(bill) {
    return from(auth().currentUser.getIdToken())
      .pipe(mergeMap(token =>
        this.http.post(
          environment.firebase.functions.url + environment.firebase.functions.sendDigitalInvoice,
          bill,
          {
            headers: {
              Authorization: 'Bearer ' + token,
              ab_data: auth().currentUser.uid
            }
          }
        )));
  }
}
