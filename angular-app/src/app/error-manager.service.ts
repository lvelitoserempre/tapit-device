import {Injectable} from '@angular/core';
import {LoadingService} from './loading.service';
import {DialogService} from './dialog/dialog-service/dialog.service';
import firebase from 'firebase/app';
import 'firebase/auth';
import AuthErrorService from './auth-error.service';
import auth = firebase.auth;

@Injectable({
  providedIn: 'root'
})
export class ErrorManagerService {

  constructor(private loadingService: LoadingService,
              private dialogService: DialogService) {
  }

  manageError(error) {
    this.loadingService.hide();

    if (error.code === 'sign-up-in-wrong-tab') {
      this.dialogService.showErrorMessage('ERRORS.SIGN_UP_IN_WRONG_TAB').subscribe();
      return;
    }

    if (error.code === 'user-under-legal-age') {
      this.dialogService.showErrorMessage('ERRORS.USER_UNDER_LEGAL_AGE').subscribe();
      return;
    }

    if (error.code === 'auth/account-exists-with-different-credential') {
      auth().fetchSignInMethodsForEmail(error.email)
        .then((providers) => {
          if (providers[0] === 'password') {
            this.dialogService.showErrorMessage('ERRORS.USE_EMAIL').subscribe();
          }

          if (providers[0] === 'google.com') {
            this.dialogService.showErrorMessage('ERRORS.USE_GOOGLE').subscribe();
          }

          if (providers[0] === 'facebook.com') {
            this.dialogService.showErrorMessage('ERRORS.USE_FACEBOOK').subscribe();
          }

          if (providers[0] === 'apple.com') {
            this.dialogService.showErrorMessage('ERRORS.USE_APPLE').subscribe();
          }
        });

      return;
    }

    this.dialogService.showErrorMessage(AuthErrorService.getErrorMessage(error));
  }
}
