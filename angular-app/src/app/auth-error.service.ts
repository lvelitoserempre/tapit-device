export default class AuthErrorService {
  private static ERRORS = {
    'auth/too-many-requests': 'ERRORS.TOO_MANY_FAILED_ATTEMPTS',
    'auth/email-already-in-use': 'ERRORS.SIGN_UP_EMAIL_ALREADY_IN_USE',
    'auth/user-not-found': 'ERRORS.USER_NOT_FOUND',
    'auth/wrong-password': 'ERRORS.WRONG_PASSWORD',
    'auth/user-cancelled': 'ERRORS.USER_CANCELLED',
    'auth/popup-closed-by-user': 'ERRORS.USER_CANCELLED',
    'sign-up-in-wrong-tab': 'ERRORS.SIGN_UP_IN_WRONG_TAB',
    'auth/account-exists-with-different-credential': 'ERRORS.USE_EMAIL',
    'auth-provider-required-email': 'ERRORS.REQUIRED_EMAIL',
    'facebook-required-public-profile': 'ERRORS.FACEBOOK_REQUIRED_PUBLIC_PROFILE',
    'auth-provider-required-birthday': 'ERRORS.REQUIRED_BIRTHDAY',
    'auth-provider-incomplete-birthday': 'ERRORS.INCOMPLETE_BIRTHDAY',
    'user-under-legal-age': 'ERRORS.USER_UNDER_LEGAL_AGE',
  };

  private constructor() {
  }

  static getErrorMessage(error: { code: string }) {
    if (!error.code) {
      console.error('MALFORMED ERROR OBJECT', error);
      return 'ERRORS.UNKNOWN';
    }

    if (!this.ERRORS[error.code]) {
      console.error('UNKNOWN ERROR', error);
      return 'ERRORS.UNKNOWN';
    }

    return this.ERRORS[error.code];
  }
}
