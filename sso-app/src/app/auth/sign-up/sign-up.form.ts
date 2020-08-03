import {AbstractControl, ValidationErrors, Validators} from '@angular/forms';

export default class SignUpForm {
  static readonly CONFIG = {
    firstName: ['', Validators.required, Validators.pattern('[A-Za-zÀ-ÖØ-öø-ÿ]*')],
    lastName: ['', Validators.required, Validators.pattern('[A-Za-zÀ-ÖØ-öø-ÿ]*')],
    email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    password: ['', [Validators.required, Validators.minLength(6), SignUpForm.passwordsMatch]],
    passwordVerification: ['', [Validators.required, SignUpForm.passwordsMatch]]
  };

  static readonly ERROR_MESSAGES = {
    firstName: {
      required: 'Debes ingresar tu nombre',
      pattern: 'Solo se aceptan letras aqui. No incluyas espacios ni caracteres especiales',
    },
    lastName: {
      required: 'Debes ingresar tu apellido',
      pattern: 'Solo se aceptan letras aqui. No incluyas espacios ni caracteres especiales',
    },
    email: {
      required: 'Debes ingresar tu email',
      pattern: 'Tu email no es válido. Tal vez esté mal escrito',
    },
    password: {
      required: 'Debes ingresar tu contraseña',
      minlength: 'Tu contraseña debe tener almenos 6 caracteres',
      passwordsMatch: 'Tus contraseñas no coinciden'
    },
    passwordVerification: {
      required: 'Debes ingresar tu contraseña de nuevo',
      passwordsMatch: 'Tus contraseñas no coinciden'
    }
  };

  private static passwordsMatch(control: AbstractControl): ValidationErrors {
    if (control.parent) {
      let password = control.parent.get('password');
      let passwordVerification = control.parent.get('passwordVerification');

      if (password.value && passwordVerification.value && (password.value !== passwordVerification.value)) {
        return {passwordsMatch: true};
      }
    }
  }
}
