import {FormControl, ValidatorFn} from '@angular/forms';
import {DateService} from './date.service';


export const userAgeValidator: ValidatorFn = (formControl: FormControl) => {
  const allowedAge = 17.999922405664563;
  const age = DateService.calculateAge(formControl.value);

  return age < allowedAge ? {underAge: true} : null;
};
