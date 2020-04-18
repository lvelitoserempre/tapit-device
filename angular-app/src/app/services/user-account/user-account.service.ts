import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';
import {environment} from 'src/environments/environment';
import {AuthService} from '../auth/auth.service';
import {UserAccount} from 'src/app/models/user-account.model';
import {from, Subject} from 'rxjs';
import {auth} from 'firebase';
import {HttpClient} from '@angular/common/http';
import {mergeMap} from 'rxjs/operators';

const USER_ACCOUNT = 'userAccount';
const KEY = 'api-key';
const VALUE = environment.cloudFunctionsApiKey;
const USER_ID_KEY = 'userId';
const PROMOTIONAL_CODE_KEY = 'promotionalCode';
const ORIGIN_KEY = 'origin';
const ORIGIN_VALUE = 'poker-web';
const PARAMS = {
  [KEY]: VALUE
};

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  private userAccountCollection: firebase.firestore.CollectionReference;
  private functions: firebase.functions.Functions;
  private userAccount = new Subject<UserAccount>();
  private initials = new Subject<string>();

  constructor(private authService: AuthService, private http: HttpClient) {
    this.userAccountCollection = firebase.firestore().collection(environment.collections.userAccount);
    this.functions = firebase.functions();
  }

  /**
   * Gets the user initials asynchronously
   */
  get userInitials() {
    return this.initials;
  }

  /**
   * Listens to user account state changes
   */
  listenUserAccountChanges() {
    this.userAccount.subscribe((userAccount) => {
      if (userAccount) {
        this.initials.next(userAccount.firstName[0] + userAccount.lastName[0]);
      }
    });
  }

  /**
   * Sends the welcoming email after sign up
   * @param userId The user uid
   */
  sendEmailUserRegister(userId) {
    PARAMS[USER_ID_KEY] = userId;
    return this.functions.httpsCallable(environment.functions.sendEmailUserRegister)(PARAMS);
  }

  /**
   * Generates a referral code after sign up
   * @param userId The user uid
   */
  createUserReferralCode(userId: string) {
    PARAMS[USER_ID_KEY] = userId;
    return this.functions.httpsCallable(environment.functions.createUserReferralCode)(PARAMS);
  }

  /**
   * Applies the provided referral code
   * @param userId The user uid
   * @param promotionalCode The promotional code
   */
  applyPromotionalCode(userId: string, promotionalCode: string) {
    PARAMS[USER_ID_KEY] = userId;
    PARAMS[PROMOTIONAL_CODE_KEY] = promotionalCode;
    return this.functions.httpsCallable(environment.functions.applyPromotionalCode)(PARAMS);
  }

  /**
   * Sets the user account in local storage
   * @param userAccount The user account info
   */
  setUserAccountInLocalStorage(userAccount: UserAccount) {
    localStorage.setItem(USER_ACCOUNT, JSON.stringify(userAccount));
    this.userAccount.next(userAccount);
  }

  /**
   * Gets the user account from local storage
   */
  getUserAccountFromLocalStorage(): UserAccount {
    return JSON.parse(localStorage.getItem(USER_ACCOUNT));
  }

  /**
   * Clears the user account from local storage
   */
  clearUserAccountFromLocalStorage() {
    localStorage.removeItem(USER_ACCOUNT);
  }

  /**
   * Gets the user account information
   * @param userId The document id
   */
  getUserAccount(userId: string) {
    const doc = this.userAccountCollection.doc(userId);
    return doc.get();
  }

  /**
   * Adds a new user account
   * @param userAccount The user account info
   */
  create(userAccount: any) {
    const userId = this.authService.getUserFromLocalStorage().uid;
    userAccount[ORIGIN_KEY] = ORIGIN_VALUE;
    return this.userAccountCollection.doc(userId).set(userAccount);
  }

  checkExistentUser(user: UserAccount) {
    return from(auth().currentUser.getIdToken())
      .pipe(mergeMap(token =>
        this.http.post(
          environment.functions.url + '/' + environment.functions.checkExistentUser,
          user,
          {
            headers: {
              Authorization: 'Bearer ' + token,
              ab_data: auth().currentUser.uid
            }
          }
        )));
  }
}
