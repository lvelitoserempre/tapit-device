import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import auth = firebase.auth;
import User = firebase.User;
import firestore = firebase.firestore;
import { UserAccount } from 'src/app/user/user-account';
import { UserDAO } from 'src/app/user/user-dao.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: ReplaySubject<UserAccount>;
  private drupalToken= new Subject<any>();
  private cancelUserListener: () => void;
  // Observer User
  public user: any = null;
  user$ = new EventEmitter;
  // Observer Token
  public token: any = null;
  token$ = new EventEmitter;

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
    ) {}

    drupalAuth(token:string): Observable<any> {
      const fd = new FormData();
      fd.append('grant_type', 'sso');
      fd.append('client_id', environment.drupal.client_id);
      fd.append('access_token', token);
      return this.httpClient.post<any>(
        `${environment.drupal?.url}${environment.drupal?.apiAuth}`,
        fd,
        {
          headers:{
            'enctype':'multipart/form-data',
          }
        }
      )
    }

    setCurrentSessionData(user: User): Promise<any> {
      return user?.getIdToken()
      .then(async (idToken: any) => {
        this.cookieService.put('frbtkn', idToken, {});
        this.drupalAuth(idToken)
        .subscribe((response) => {
          this.cookieService.put('DRUPAL_SESSION', response.access_token, {});
          this.cookieService.put('__session', response.access_token, {});
          this.setDrupalToken(response.access_token);
          return this.getFireStoreUserDocument(user.uid)
          .then(userDocument => {
            const res = this.setCurrentUser(UserDAO.snapshotToUser(userDocument));
          }).catch(error => console.log(error));
        })
      }).catch(error => console.log(error));
    }

    getFireStoreUserDocument(userId: string): Promise<any> {
      return firestore().collection(environment.firebase.collections.userAccount)
      .doc(userId)
      .get()
    }

    async setCurrentUser(user: UserAccount) {
      await this.addIdToken(user);
      this.saveUserToACookie(user);
      return user;
    }

    async addIdToken(user: UserAccount) {
      if (auth().currentUser) {
        const token = await auth().currentUser.getIdToken();
        user.idToken = token;
        user.refreshToken = auth().currentUser.refreshToken;
      }
    }

    saveUserToACookie(user: UserAccount) {
      this.cookieService.putObject('loggedUser', this.extractCookieData(user), {});
    }

    private extractCookieData(user: UserAccount): any {
      return user ? {
        id: user.id,
        email: user.email,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        points: user.points || 0,
        idToken: user.idToken,
        refreshToken: user.refreshToken,
        uid: user.uid
      } : null;
    }

    getCurrentUser() {
      return this.currentUser.asObservable();
    }
    getDrupalToken() {
      return this.drupalToken.asObservable();
    }
    setDrupalToken(token:string) {
      this.drupalToken.next({data: token})
    }

    loginUserByCustomToken (token:string) {
      auth().signInWithCustomToken(token)
      .then(userCredential=> {        
        userCredential.user.getIdToken()
        .then(response => this.drupalAuth(response)).catch(error => console.error(error));
      }).catch(error => console.error(error));
    }
  }
