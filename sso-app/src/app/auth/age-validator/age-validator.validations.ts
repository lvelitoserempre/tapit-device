import {Validators} from '@angular/forms';

export const Validations = {
  day: ['', [Validators.required, Validators.pattern('^[0-9]{1,2}$'), Validators.min(1), Validators.max(31)]],
  month: ['', [Validators.required, Validators.pattern('^[0-9]{1,2}$'), Validators.min(1), Validators.max(12)]],
  year: ['', [Validators.required, Validators.pattern('^[0-9]{1,4}$'), Validators.min((new Date()).getFullYear() - 100), Validators.max((new Date()).getFullYear())]],
};

export const ValidationMessages = {
  day: {
    required: 'AGE_VALIDATOR.VALIDATIONS.DAY_REQUIRED',
    pattern: 'AGE_VALIDATOR.VALIDATIONS.DAY_PATTERN',
    min: 'AGE_VALIDATOR.VALIDATIONS.DAY_PATTERN',
    max: 'AGE_VALIDATOR.VALIDATIONS.DAY_PATTERN'
  },
  month: {
    required: 'AGE_VALIDATOR.VALIDATIONS.MONTH_REQUIRED',
    pattern: 'AGE_VALIDATOR.VALIDATIONS.MONTH_PATTERN',
    min: 'AGE_VALIDATOR.VALIDATIONS.MONTH_PATTERN',
    max: 'AGE_VALIDATOR.VALIDATIONS.MONTH_PATTERN'
  },
  year: {
    required: 'AGE_VALIDATOR.VALIDATIONS.YEAR_REQUIRED',
    pattern: 'AGE_VALIDATOR.VALIDATIONS.YEAR_PATTERN',
    min: 'AGE_VALIDATOR.VALIDATIONS.YEAR_PATTERN',
    max: 'AGE_VALIDATOR.VALIDATIONS.YEAR_PATTERN'
  },
};
