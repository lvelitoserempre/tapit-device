import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {LoaderService} from 'src/app/loader/loader-service/loader.service';
import {UserAuthenticationService} from '../user-authentication-service/user-authentication.service';
import {DialogService} from '../../dialog/dialog-service/dialog.service';
import {LoginValidationMessages, LoginValidators} from './login.validations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  validationMessages = LoginValidationMessages;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loaderService: LoaderService,
    private dialogService: DialogService,
    private userService: UserAuthenticationService
  ) {
    this.loginForm = this.formBuilder.group(LoginValidators);
  }

  login() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    this.loaderService.show();

    this.userService.login(email, password)
      .subscribe(res => {
          this.loaderService.hide();
          this.router.navigateByUrl('/home');
        },
        error => {
          this.loaderService.hide();
          this.dialogService.manageError(error);
        });
  }
}
