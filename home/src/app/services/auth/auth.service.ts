import { EventEmitter, Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { of, ReplaySubject, Subject } from 'rxjs';
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
    private _angularFireAuth: AngularFireAuth,
    private _angularFirestore: AngularFirestore,
    private httpClient: HttpClient,
    private cookieService: CookieService,
    ) {
      this.observerUser();
      this.currentUser = new ReplaySubject<UserAccount>(0);
    }

    // Allows to observe changes in the user
    private observerUser(): void {
      this.user$.subscribe(user => {
        this.user = user;
      });
    }

    // Allows to observe changes in the token
    private observerToken(): void {
      this.token$.subscribe(token => {
        this.token = token;
      });
    }

    async getUser() {
      await this._angularFireAuth.user.pipe(switchMap(user => {
        return user ? this._angularFirestore.collection('user_account_tap').doc(user.uid).valueChanges() : of(null);
      })).subscribe(user => {
        this.user$.emit(user);
      });
      this.setupLoggedUserObserver();
    }

    setupLoggedUserObserver() {
      auth().onAuthStateChanged((user: User) => {
        if (user && !this.cancelUserListener) {
          this.cancelUserListener = firestore().collection(environment.firebase.collections.userAccount).doc(user.uid)
          .onSnapshot(async(snapshot) => {
            const res = await this.setCurrentUser(UserDAO.snapshotToUser(snapshot));
            const accessToken = res.idToken;
            if (!this.cookieService.get('DRUPAL_SESSION')) {
              this.drupalAuth(accessToken);
            }
            this.token$.emit(accessToken);
            //this.ngxService.stop();
          });
        } else {
          if (this.cancelUserListener) {
            this.cancelUserListener();
          }
          this.cancelUserListener = null;
          this.setCurrentUser(null);
        }
      });
    }

    drupalAuth(token:string): void {
      const fd = new FormData();
      fd.append('grant_type', 'sso');
      fd.append('client_id', environment.drupal.client_id);
      fd.append('access_token', token);
      this.httpClient.post<any>(
        `${environment.drupal?.url}${environment.drupal?.apiAuth}`,
        fd,
        {
          headers:{
            'enctype':'multipart/form-data',
          }
        }
      ).subscribe((response) => {
        this.cookieService.put('DRUPAL_SESSION', response.access_token, {});
        this.cookieService.put('__session', response.access_token, {});
        this.setDrupalToken(response.access_token);
      })
    }

    async setCurrentUser(user: UserAccount) {
      await this.addIdToken(user);
      this.currentUser.next(user);
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

    private extractCookieData(data: UserAccount): any {
      return data ? {
        id: data.id,
        email: data.email,
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        points: data.points || 0,
        idToken: data.idToken,
        refreshToken: data.refreshToken
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
  }
