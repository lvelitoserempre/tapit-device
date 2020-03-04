import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

const USER = 'user';

@Injectable({
    providedIn: 'root'
})
/**
 * Service for Firebase authentication
 */
export class AuthService {

    /**
     * Listens to user state changes
     */
    listenUserStateChanges() {
        firebase.auth().onAuthStateChanged((user: firebase.User) => {
            if (user) {
                // When the user logs in, the session is saved in local storage
                this.setUserInLocalStorage(user);
            }
        });
    }

    /**
     * Sets the user info in local storage
     * @param user The user info
     */
    setUserInLocalStorage(user: any) {
        localStorage.setItem(USER, JSON.stringify(user));
    }

    /**
     * Gets the user info from local storage
     */
    getUserFromLocalStorage(): any {
        return JSON.parse(localStorage.getItem(USER));
    }

    /**
     * Clears the user info from local storage
     */
    clearUser() {
        localStorage.removeItem(USER);
    }

    /**
     * Signs up a new user
     * @param email The email address
     * @param password The password
     */
    signUp(email: string, password: string): Promise<any> {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    /**
     * Logs in an existing user
     * @param email The email address
     * @param password The password
     */
    login(email: string, password: string): Promise<any> {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    /**
     * Logs out an existing user
     */
    logout(): Promise<any> {
        return firebase.auth().signOut();
    }

    /**
     * Checks whether a user is logged in
     */
    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem(USER));
        return !!user;
    }
}
