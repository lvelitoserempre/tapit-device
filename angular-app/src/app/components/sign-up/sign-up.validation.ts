import {UnderAgeValidator} from '../../common/utils/validators';
import {Validators} from '@angular/forms';

export const SignUpValidators = {
  birthDate: ['', Validators.compose([Validators.required, UnderAgeValidator])],
  email: ['', [Validators.required, Validators.email]],
  password: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,}$/)])],
  firstName: ['', Validators.required],
  lastName: ['', Validators.required],
  phone: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]{10}$/)])],
  referralCode: ['']
};

export const SignUpValidationMessages = {
  birthDate: {
    required: 'Por favor, selecciona una fecha de nacimiento.',
    underAge: 'Debes ser mayor de 18 para poder registrarte.'
  },
  email: {
    required: 'El email es obligatorio.',
    email: 'El formato de email no es válido.'
  },
  password: {
    required: 'La contraseña es obligatoria.',
    pattern: 'La contraseña debe de tener al menos 6 caracteres.'
  },
  firstName: {required: 'El nombre es obligatorio.'},
  lastName: {required: 'Los apellidos son obligatorios.'},
  phone: {
    required: 'El número de teléfono es obligatorio.',
    pattern: 'El teléfono tiene que tener 10 dígitos.'
  }
};
