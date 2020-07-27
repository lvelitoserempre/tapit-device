import {Validators} from '@angular/forms';

export const LoginByEmailValidators = {
  email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
  password: ['', Validators.required]
};

export const LoginByEmailValidationMessages = {
  email: {required: 'validations.emailRequired', pattern: 'validations.invalidEmail'},
  password: {required: 'validations.passRequired'},
};
