import {Validators} from '@angular/forms';

export const LoginValidators = {
  email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
  password: ['', Validators.required]
};

export const LoginValidationMessages = {
  email: {required: 'validations.emailRequired', pattern: 'validations.invalidEmail'},
  password: {required: 'validations.passRequired'},
};
