import {Validators} from '@angular/forms';

/**
 * Model for login and signup forms
 */
export class AuthFormModel {
  email = ['', [Validators.required, Validators.email]];
  password = ['', Validators.required];
}
