export default class AuthErrorService {
  private static ERRORS = {
    'auth/too-many-requests': 'DIALOG.TOO_MANY_FAILED_ATTEMPTS.MESSAGE',
    'auth/email-already-in-use': 'DIALOG.SIGN_UP_EMAIL_ALREADY_IN_USE.MESSAGE',
    'auth/user-not-found': 'DIALOG.USER_NOT_FOUND.MESSAGE',
    'auth/wrong-password': 'DIALOG.WRONG_PASSWORD.MESSAGE',
    'auth/user-cancelled': 'DIALOG.USER_CANCELLED',
    'auth/popup-closed-by-user': 'DIALOG.USER_CANCELLED',
    'sign-up-in-wrong-tab': 'DIALOG.SIGN_UP_IN_WRONG_TAB',
    'auth/account-exists-with-different-credential': 'DIALOG.ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL',
    'auth-provider-required-email': 'DIALOG.REQUIRED_EMAIL',
    'facebook-required-public-profile': 'DIALOG.FACEBOOK_REQUIRED_PUBLIC_PROFILE',
    'auth-provider-required-birthday': 'DIALOG.REQUIRED_BIRTHDAY',
    'auth-provider-incomplete-birthday': 'DIALOG.INCOMPLETE_BIRTHDAY',
    'user-under-legal-age': 'DIALOG.USER_UNDER_LEGAL_AGE',
  };

  private constructor() {
  }

  static getErrorMessage(error: { code: string }, translationParams?) {
    if (!error.code) {
      console.error('MALFORMED ERROR OBJECT', error);
      return 'DIALOG.UNKNOWN_ERROR';
    }

    if (!this.ERRORS[error.code]) {
      console.error('UNKNOWN ERROR', error);
      return 'DIALOG.UNKNOWN_ERROR';
    }

    return this.ERRORS[error.code];
  }
}
