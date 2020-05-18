export enum AuthError {
  AUTH_ERROR_EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use',
  AUTH_ERROR_USER_NOT_FOUND = 'auth/user-not-found',
  AUTH_ERROR_WRONG_PASSWORD = 'auth/wrong-password',
  AUTH_ERROR_TOO_MANY_FAILED_ATTEMPTS = 'auth/too-many-requests',
  AUTH_ERROR_USER_CANCELLED = 'auth/user-cancelled'
}
