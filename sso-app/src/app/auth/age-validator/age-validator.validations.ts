import {Validators} from '@angular/forms';

export const Validations = {
  day: ['', [Validators.required, Validators.pattern('^[0-9]{1,2}$')]],
  month: ['', [Validators.required, Validators.pattern('^[0-9]{1,2}$')]],
  year: ['', [Validators.required, Validators.pattern('^[0-9]{1,4}$')]],
};

export const ValidationMessages = {
  day: {required: 'AGE_VALIDATOR.VALIDATIONS.DAY_REQUIRED', pattern: 'AGE_VALIDATOR.VALIDATIONS.DAY_PATTERN'},
  month: {required: 'AGE_VALIDATOR.VALIDATIONS.MONTH_REQUIRED', pattern: 'AGE_VALIDATOR.VALIDATIONS.MONTH_PATTERN'},
  year: {required: 'AGE_VALIDATOR.VALIDATIONS.YEAR_REQUIRED', pattern: 'AGE_VALIDATOR.VALIDATIONS.YEAR_PATTERN'},
};
