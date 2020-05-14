import {Validators} from '@angular/forms';
import {userAgeValidator} from '../../services/user-age-validator';

export const SignUpValidators = {
  firstName: ['', Validators.minLength(3)],
  lastName: ['', Validators.minLength(3)],
  email: ['', Validators.email],
  password: ['', Validators.minLength(6)],
  birthDate: ['', [Validators.required, userAgeValidator]],
  phone: ['', [Validators.minLength(10), Validators.pattern(/^\+?[0-9]+$/)]],
  referralCode: ['']
};

export const SignUpValidationMessages = {
  firstName: {
    required: 'El nombre es obligatorio.',
    minlength: 'El nombre debe tener almenos 3 caracteres.'
  },
  lastName: {
    required: 'El apellido es obligatorio.',
    minlength: 'El apellido debe tener almenos 3 caracteres.'
  },
  email: {
    required: 'El email es obligatorio.',
    email: 'El formato de email no es válido.'
  },
  password: {
    required: 'La contraseña es obligatoria.',
    minlength: 'La contraseña debe tener almenos 6 caracteres.'
  },
  birthDate: {
    required: 'Por favor, selecciona una fecha de nacimiento.',
    underAge: 'Debes ser mayor de 18 para poder registrarte.'
  },
  phone: {
    required: 'El número de teléfono es obligatorio.',
    pattern: 'El número de teléfono solo puede tener numeros.',
    minlength: 'El número de teléfono debe tener almenos 10 dígitos.'
  }
};
