import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {mergeMap} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserAccount} from '../../models/user-account.model';
import {environment} from '../../../environments/environment';
import {forkJoin} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {
  constructor(private auth: AngularFireAuth, private http: HttpClient) {
  }

  checkExistentUser(user: UserAccount) {
    return forkJoin([this.auth.idToken, this.auth.user])
      .pipe(mergeMap(([token, loggedUser]) =>
        this.http.post(
          environment.functions.url + '/' + environment.functions.checkExistentUser,
          user,
          {
            headers: {
              Authorization: 'Bearer ' + token,
              ab_data: loggedUser.uid
            }
          }
        )));
  }
}
