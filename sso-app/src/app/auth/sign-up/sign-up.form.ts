import {AbstractControl, ValidationErrors, Validators} from '@angular/forms';

export default class SignUpForm {
  static readonly CONFIG = {
    firstName: ['', [Validators.required, Validators.pattern('[A-Za-zÀ-ÖØ-öø-ÿ]*')]],
    lastName: ['', [Validators.required, Validators.pattern('[A-Za-zÀ-ÖØ-öø-ÿ]*')]],
    birthDate: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
    password: ['', [Validators.required, Validators.minLength(6), SignUpForm.passwordsMatch]],
    passwordVerification: ['', [Validators.required, SignUpForm.passwordsMatch]]
  };

  static readonly ERROR_MESSAGES = {
    firstName: {
      required: 'SIGN_UP.VALIDATIONS.FIRST_NAME.REQUIRED',
      pattern: 'SIGN_UP.VALIDATIONS.FIRST_NAME.PATTERN',
    },
    lastName: {
      required: 'SIGN_UP.VALIDATIONS.LAST_NAME.REQUIRED',
      pattern: 'SIGN_UP.VALIDATIONS.LAST_NAME.PATTERN',
    },
    email: {
      required: 'SIGN_UP.VALIDATIONS.EMAIL.REQUIRED',
      pattern: 'SIGN_UP.VALIDATIONS.EMAIL.PATTERN',
    },
    password: {
      required: 'SIGN_UP.VALIDATIONS.PASSWORD.REQUIRED',
      minlength: 'SIGN_UP.VALIDATIONS.PASSWORD.MIN_LENGTH',
      passwordsMatch: 'SIGN_UP.VALIDATIONS.PASSWORD.PASSWORD_MATCH'
    },
    passwordVerification: {
      required: 'SIGN_UP.VALIDATIONS.PASSWORD_VERIFICATION.REQUIRED',
      passwordsMatch: 'SIGN_UP.VALIDATIONS.PASSWORD_VERIFICATION.PASSWORD_MATCH'
    },
    birthDate: {
      required: 'SIGN_UP.VALIDATIONS.BIRTH_DATE.REQUIRED',
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
