import {AbstractControl, ValidationErrors, Validators} from '@angular/forms';
import AgeValidatorService from '../age-validator.service';

export default class SignUpForm {
  static readonly CONFIG = {
    firstName: ['', [Validators.required, Validators.pattern('[A-Za-zÀ-ÖØ-öø-ÿ ]*')]],
    lastName: ['', [Validators.required, Validators.pattern('[A-Za-zÀ-ÖØ-öø-ÿ ]*')]],
    birthDate: ['', [Validators.required, SignUpForm.olderThan(18)]],
    cpf: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
    password: ['', [Validators.required, Validators.minLength(6), SignUpForm.passwordsMatch]],
    passwordVerification: ['', [Validators.required, SignUpForm.passwordsMatch]],
    acceptTerms: [false, {validators: [Validators.requiredTrue], updateOn: 'change'}],
    acceptOffers: [false]
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
    cpf: {
      required: 'SIGN_UP.VALIDATIONS.CPF.REQUIRED',
      pattern: 'SIGN_UP.VALIDATIONS.CPF.PATTERN',
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
      olderThan: 'SIGN_UP.VALIDATIONS.BIRTH_DATE.OLDER_THAN'
    },
    interests: {
      required: 'SIGN_UP.VALIDATIONS.INTERESTS.REQUIRED',
    },
    acceptTerms: {
      required: 'SIGN_UP.VALIDATIONS.ACCEPT_TERMS.REQUIRED',
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

  private static olderThan(years: number) {
    return (control: AbstractControl): ValidationErrors => {
      if (control.value) {
        const date = new Date(control.value);

        if (!AgeValidatorService.olderThan(date, years)) {
          return {olderThan: true};
        }
      }
    }
  }
}
