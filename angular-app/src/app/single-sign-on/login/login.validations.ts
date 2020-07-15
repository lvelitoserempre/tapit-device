import {Validators} from '@angular/forms';

export const LoginValidators = {
  terms: ['', {validators: [Validators.requiredTrue], updateOn: 'change'}],
};

export const LoginValidationMessages = {
  terms: {required: 'Debes aceptar los términos y condiciones'}
};
