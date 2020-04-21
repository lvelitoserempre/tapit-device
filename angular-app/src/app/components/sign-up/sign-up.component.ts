import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserAccountService} from 'src/app/services/user-account/user-account.service';
import {LoaderService} from 'src/app/services/loader/loader.service';
import {AuthService} from 'src/app/services/auth/auth.service';
import {Router} from '@angular/router';
import {DialogService} from 'src/app/services/dialog/dialog.service';
import {from} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {Moment} from 'moment';
import {SignUpValidationMessages, SignUpValidators} from './sign-up.validation';
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
    private userAccountService: UserAccountService,
    private loaderService: LoaderService,
    private authService: AuthService,
    private router: Router,
    private dialogService: DialogService
  ) {
    this.signUpForm = this.formBuilder.group(SignUpValidators);
  }

  async onSubmit() {
    const form = this.signUpForm.value;
    const date = this.signUpForm.get('birthDate').value as Moment;

    this.loaderService.show();

    from(this.authService.signUp(form.email, form.password))
      .pipe(mergeMap((userCredential: UserCredential) => {
        this.authService.setUserInLocalStorage(userCredential.user);

        return from(this.authService.login(form.email, form.password));
      }))
      .pipe(mergeMap(() =>
        this.userAccountService.checkExistentUser({
          email: form.email,
          firstName: form.firstName,
          lastName: form.lastName,
          birthDate: date.toDate().getTime(),
          phone: form.phone
        })))
      .subscribe(res => {
          this.loaderService.hide();
          this.router.navigate(['/home']);
        },
        error => {
          this.loaderService.hide();
          this.dialogService.manageError(error);
        });
  }
}
