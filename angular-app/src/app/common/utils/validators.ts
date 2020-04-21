import {FormControl, ValidatorFn} from '@angular/forms';
import {DateFormatter} from './date-formatter';


export const UnderAgeValidator: ValidatorFn = (formControl: FormControl) => {
  const allowedAge = 17.999922405664563;
  const age = DateFormatter.calculateAge(formControl.value);

  return age < allowedAge ? {underAge: true} : null;
};
