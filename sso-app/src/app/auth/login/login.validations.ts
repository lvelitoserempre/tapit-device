import {Validators} from '@angular/forms';

export const LoginValidators = {
  email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
  password: ['', Validators.required],
  remember: [false],
};

export const LoginValidationMessages = {
  email: {required: 'LOGIN.VALIDATIONS.EMAIL_REQUIRED', pattern: 'LOGIN.VALIDATIONS.INVALID_EMAIL'},
  password: {required: 'LOGIN.VALIDATIONS.PASSWORD_REQUIRED'},
};
