import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LoaderService} from 'src/app/loader/loader-service/loader.service';
import {Router} from '@angular/router';
import {DialogService} from 'src/app/dialog/dialog-service/dialog.service';
import {SignUpValidationMessages, SignUpValidators} from './sign-up.validations';
import {SignupService} from '../signup.service';
import {FacebookService} from '../facebook.service';

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
    private signupService: SignupService,
    private facebookService: FacebookService,
    private router: Router,
    private loaderService: LoaderService,
    private dialogService: DialogService
  ) {
    this.signUpForm = this.formBuilder.group(SignUpValidators);
  }

  signUp() {
    this.loaderService.show();
    this.signupService.signUp(this.signUpForm.value)
      .subscribe(res => {
          this.loaderService.hide();
          this.router.navigate(['/']);
        },
        error => {
          this.loaderService.hide();
          this.dialogService.manageError(error);
        });
  }

  loginWithFacebook() {
    this.loaderService.show();
    this.facebookService.login()
      .subscribe(res => {
          this.loaderService.hide();
          this.router.navigateByUrl('');
        },
        error => {
          this.loaderService.hide();
          this.dialogService.manageError(error);
        });
  }
}
