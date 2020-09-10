import {Validators} from '@angular/forms';

export const RecoverPasswordValidators = {
  email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
};

export const RecoverPasswordValidationMessages = {
  email: {required: 'RECOVER_PASSWORD.VALIDATIONS.EMAIL_REQUIRED', pattern: 'RECOVER_PASSWORD.VALIDATIONS.INVALID_EMAIL'},
};
