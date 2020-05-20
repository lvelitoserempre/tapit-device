export enum AUTH_ERRORS {
  EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use',
  USER_NOT_FOUND = 'auth/user-not-found',
  WRONG_PASSWORD = 'auth/wrong-password',
  TOO_MANY_REQUESTS = 'auth/too-many-requests',
  USER_CANCELLED = 'auth/user-cancelled',
  POPUP_CLOSED_BY_USER = 'auth/popup-closed-by-user'
}
