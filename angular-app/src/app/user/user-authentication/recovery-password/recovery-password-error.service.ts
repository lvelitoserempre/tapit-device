import {FirebaseError} from 'firebase';

export default class RecoveryPasswordErrorService {
  static getErrorMessage(error: FirebaseError) {
    switch (error.code) {
      case 'auth/invalid-action-code':
        return 'El link de restablecimiento de contraseña no es válido. Intenta de nuevo';

      case 'auth/expired-action-code':
        return 'El link de restablecimiento de contraseña ha expirado. Intenta de nuevo';

      case 'auth/weak-password':
        return 'La contraseña debe tener almenos seis caracteres. Intenta de nuevo';

      case 'auth/invalid-email':
        return 'El email ingresado es inválido. Intenta de nuevo';

      default:
        console.error(error);
        return 'Se ha producido un error desconocido.';
    }
  }
}