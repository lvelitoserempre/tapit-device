import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';

const USER = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {
  }

  listenUserStateChanges() {
    this.auth.authState.subscribe((user: User) => {
      if (user) {
        this.setUserInLocalStorage(user);
      }
    });
  }

  setUserInLocalStorage(user: any) {
    localStorage.setItem(USER, JSON.stringify(user));
  }

  getUserFromLocalStorage(): any {
    return JSON.parse(localStorage.getItem(USER));
  }

  clearUser() {
    localStorage.removeItem(USER);
  }

  signUp(email: string, password: string): Promise<any> {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string): Promise<any> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<any> {
    return this.auth.signOut();
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem(USER));
    return !!user;
  }
}
