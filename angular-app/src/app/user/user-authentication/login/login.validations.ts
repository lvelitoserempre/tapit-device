import {Validators} from '@angular/forms';

export const LoginValidators = {
  email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
  password: ['', Validators.required],
  terms: ['', Validators.requiredTrue],
  offers: ['']
};

export const LoginValidationMessages = {
  email: {required: 'El email es obligatorio.', email: 'El formato de email no es válido.'},
  password: {required: 'La contraseña es obligatoria.'},
  terms: {required: 'Debes aceptar los términos y condiciones'}
};
