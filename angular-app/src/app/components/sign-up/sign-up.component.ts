import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LoaderService} from 'src/app/services/loader/loader.service';
import {Router} from '@angular/router';
import {DialogService} from 'src/app/services/dialog/dialog.service';
import {from} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {Moment} from 'moment';
import {SignUpValidationMessages, SignUpValidators} from './sign-up.validation';
import {UserService} from '../../user/user.service';
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
    private userService: UserService,
    private router: Router,
    private loaderService: LoaderService,
    private dialogService: DialogService
  ) {
    this.signUpForm = this.formBuilder.group(SignUpValidators);
  }

  async onSubmit() {
    const form = this.signUpForm.value;
    const date = this.signUpForm.get('birthDate').value as Moment;

    console.log(form.referralCode, 'errr');

    this.loaderService.show();

    from(this.userService.signUp(form.email, form.password))
      .pipe(mergeMap((user: UserCredential) => {
          const userData = {
            id: user.user.uid,
            email: form.email,
            firstName: form.firstName,
            lastName: form.lastName,
            birthDate: date.toISOString(),
            phone: form.phone,
            referredBy: form.referralCode,
            origin: 'pola'
          };

          this.userService.setCurrentUser(userData);

          if (!form.referredBy || !form.referredBy.trim()) {
            delete userData.referredBy;
          }

          delete userData.id;
          return this.userService.checkExistentUser(userData);
        }
      ))
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
