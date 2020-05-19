import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LoaderService} from 'src/app/loader/loader-service/loader.service';
import {Router} from '@angular/router';
import {DialogService} from 'src/app/dialog/dialog-service/dialog.service';
import {from} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {SignUpValidationMessages, SignUpValidators} from './sign-up.validations';
import {UserAuthenticationService} from '../user-authentication-service/user-authentication.service';
import UserCredential = firebase.auth.UserCredential;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  signUpForm: FormGroup;
  validationMessages = SignUpValidationMessages;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserAuthenticationService,
    private router: Router,
    private loaderService: LoaderService,
    private dialogService: DialogService
  ) {
    this.signUpForm = this.formBuilder.group(SignUpValidators);
  }

  async onSubmit() {
    const form = this.signUpForm.value;
    const userData: any = this.parseUserForm();

    this.loaderService.show();

    from(this.userService.signUp(form.email, form.password))
      .pipe(mergeMap((userCredential: UserCredential) => this.userService.checkUser(userData)))
      .subscribe(res => {
          this.loaderService.hide();
          this.router.navigate(['/']);
        },
        error => {
          this.loaderService.hide();
          this.dialogService.manageError(error);
        });
  }

  private parseUserForm() {
    const form = this.signUpForm.value;

    return {
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      birthDate: form.birthDate.toISOString(),
      phone: form.phone,
      origin: 'pola',
      ...(form.referralCode && form.referralCode.trim()) && {referredBy: form.referralCode}
    };
  }
}
