import {Injectable} from '@angular/core';
import {DialogConfiguration} from 'src/app/dialog/dialog-configuration';
import {DialogComponent} from 'src/app/dialog/dialog.component';
import {AUTH_ERRORS} from 'src/app/auth/auth-error.enum';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {
  }

  /**
   * Opens the too many login attempts error dialog and returns the dialog reference for further actions
   */
  openTooManyFailedAttemptsErrorDialog(): MatDialogRef<DialogComponent> {
    // TODO: translate
    const dialogConfig: DialogConfiguration = {
      title: 'DIALOG.TOO_MANY_FAILED_ATTEMPTS.TITLE',
      message: 'DIALOG.TOO_MANY_FAILED_ATTEMPTS.MESSAGE',
      buttonOne: 'DIALOG.TOO_MANY_FAILED_ATTEMPTS.BUTTON_LABEL'
    };

    return this.showErrorDialog(dialogConfig);
  }

  /**
   * Opens the wrong password error dialog and returns the dialog reference for further actions
   */
  openWrongPasswordErrorDialog(message?: string): MatDialogRef<DialogComponent> {
    // TODO: translate
    const dialogConfig: DialogConfiguration = {
      title: 'DIALOG.WRONG_PASSWORD.TITLE',
      message: message || 'DIALOG.WRONG_PASSWORD.MESSAGE',
      buttonOne: 'DIALOG.WRONG_PASSWORD.BUTTON_LABEL'
    };

    return this.showErrorDialog(dialogConfig);
  }

  /**
   * Opens the user not found error dialog and returns the dialog reference for further actions
   */
  openUserNotFoundErrorDialog(): MatDialogRef<DialogComponent> {
    // TODO: translate
    const dialogConfig: DialogConfiguration = {
      title: 'DIALOG.USER_NOT_FOUND.TITLE',
      message: 'DIALOG.USER_NOT_FOUND.MESSAGE',
      buttonOne: 'DIALOG.USER_NOT_FOUND.BUTTON_LABEL'
    };

    return this.showErrorDialog(dialogConfig);
  }

  /**
   * Opens the sign up email already in use error dialog and returns the dialog reference for further actions
   */
  openSignUpEmailAlreadyInUseErrorDialog() {
    // TODO: translate
    const dialogConfig: DialogConfiguration = {
      title: 'DIALOG.SIGN_UP_EMAIL_ALREADY_IN_USE.TITLE',
      message: 'DIALOG.SIGN_UP_EMAIL_ALREADY_IN_USE.MESSAGE',
      buttonOne: 'DIALOG.SIGN_UP_EMAIL_ALREADY_IN_USE.BUTTON_LABEL',
    };

    return this.showErrorDialog(dialogConfig);
  }

  manageError(error: any) {
    if (error.code === AUTH_ERRORS.TOO_MANY_REQUESTS) {
      this.openTooManyFailedAttemptsErrorDialog();
    } else if (error.code === AUTH_ERRORS.EMAIL_ALREADY_IN_USE) {
      this.openSignUpEmailAlreadyInUseErrorDialog();
    } else if (error.code === AUTH_ERRORS.USER_NOT_FOUND) {
      this.openUserNotFoundErrorDialog();
    } else if (error.code === AUTH_ERRORS.WRONG_PASSWORD) {
      this.openWrongPasswordErrorDialog();
    } else if (error.code === AUTH_ERRORS.USER_CANCELLED || error.code === AUTH_ERRORS.POPUP_CLOSED_BY_USER) {
      this.openWrongPasswordErrorDialog('DIALOG.USER_CANCELLED');
    } else if (error.code === AUTH_ERRORS.FACEBOOK_REQUIRED_EMAIL) {
      this.showErrorMessage('DIALOG.FACEBOOK_REQUIRED_EMAIL');
    } else if (error.code === AUTH_ERRORS.FACEBOOK_SIGN_UP_IN_WRONG_TAB) {
      this.showErrorMessage('DIALOG.FACEBOOK_SIGN_UP_IN_WRONG_TAB');
    } else {
      this.showErrorMessage('DIALOG.UKNOWN_ERROR');
    }

    console.error(error);
  }

  showErrorDialog(config: DialogConfiguration): MatDialogRef<DialogComponent> {
    return this.dialog.open(DialogComponent, {
      panelClass: ['border', 'border-primary-500'],
      data: config
    });
  }

  showErrorMessage(message: string) {
    return this.showErrorDialog({
      title: 'DIALOG.ERROR_MESSAGE.TITLE',
      message,
      buttonOne: 'DIALOG.ERROR_MESSAGE.BUTTON_LABEL'
    });
  }
}
