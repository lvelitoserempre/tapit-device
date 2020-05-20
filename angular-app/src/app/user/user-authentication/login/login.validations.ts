import {Validators} from '@angular/forms';

export const LoginValidators = {
  email: ['', [Validators.required, Validators.email]],
  password: ['', Validators.required]
};

export const LoginValidationMessages = {
  email: {required: 'El email es obligatorio.', email: 'El formato de email no es válido.'},
  password: {required: 'La contraseña es obligatoria.'}
};
