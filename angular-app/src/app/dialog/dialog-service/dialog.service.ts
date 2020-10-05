import {Injectable} from '@angular/core';
import {DialogConfigurationModel} from 'src/app/models/dialog-configuration.model';
import {DialogComponent} from 'src/app/dialog/dialog.component';
import {AUTH_ERRORS} from 'src/app/user/user-authentication/auth-error.enum';
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
    const dialogConfig: DialogConfigurationModel = {
      title: 'Error de autenticación',
      message: 'Demasiados intentos fallidos. Por favor inténtalo de nuevo más tarde.',
      buttonOne: 'Aceptar'
    };

    return this.showErrorDialog(dialogConfig);
  }

  /**
   * Opens the wrong password error dialog and returns the dialog reference for further actions
   */
  openWrongPasswordErrorDialog(message?: string): MatDialogRef<DialogComponent> {
    // TODO: translate
    const dialogConfig: DialogConfigurationModel = {
      title: 'Error de autenticación',
      message: message || 'La contraseña no es correcta o el usuario no tiene una.',
      buttonOne: 'Aceptar'
    };

    return this.showErrorDialog(dialogConfig);
  }

  /**
   * Opens the user not found error dialog and returns the dialog reference for further actions
   */
  openUserNotFoundErrorDialog(): MatDialogRef<DialogComponent> {
    // TODO: translate
    const dialogConfig: DialogConfigurationModel = {
      title: 'Error de autenticación',
      message: 'No existe registro de usuario con este identificador. El usuario puede haber sido eliminado.',
      buttonOne: 'Aceptar'
    };

    return this.showErrorDialog(dialogConfig);
  }

  /**
   * Opens the sign up email already in use error dialog and returns the dialog reference for further actions
   */
  openSignUpEmailAlreadyInUseErrorDialog() {
    // TODO: translate
    const dialogConfig: DialogConfigurationModel = {
      title: 'Error en alta de usuario',
      message: 'La dirección de correo electrónico se encuentra en uso por otra cuenta.\n¿Es posible que ya estés registrado/a?',
      buttonOne: 'Aceptar'
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
    } else if (error.code === 'auth/user-cancelled' || error.code === 'auth/popup-closed-by-user') {
      this.openWrongPasswordErrorDialog('Debes autorizar el uso de tus datos en la ventana de facebook.');
    } else {
      this.showErrorMessage('Se ha producido un error desconocido.');
    }
    throw error;
  }

  showErrorDialog(config: DialogConfigurationModel): MatDialogRef<DialogComponent> {
    return this.dialog.open(DialogComponent, {
      panelClass: ['border', 'border-primary-500'],
      data: config
    });
  }

  showErrorMessage(message: string) {
    return this.showErrorDialog({
      title: 'Error',
      message,
      buttonOne: 'Aceptar'
    });
  }
}
