import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LoaderService} from 'src/app/loader/loader-service/loader.service';
import {AuthService} from '../user-authentication-service/auth.service';
import {DialogService} from '../../../dialog/dialog-service/dialog.service';
import {LoginValidationMessages, LoginValidators} from './login.validations';
import {FacebookService} from '../facebook.service';
import {CookiesService} from '../../../services/cookies.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  validationMessages = LoginValidationMessages;
  private backUrl: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private loaderService: LoaderService,
              private dialogService: DialogService, private userAuthenticationService: AuthService,
              private facebookService: FacebookService) {
    this.loginForm = this.formBuilder.group(LoginValidators, {updateOn: 'blur'});
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      this.backUrl = queryParams.backUrl;
    });
  }

  login() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      const email = this.loginForm.get('email').value;
      const password = this.loginForm.get('password').value;

      this.loaderService.show();

      this.userAuthenticationService.login(email, password)
        .subscribe(res => {
            this.loaderService.hide();
            this.redirectUser();
          },
          error => {
            this.loaderService.hide();
            this.dialogService.manageError(error);
          });
    }
  }

  loginWithFacebook() {
    if (!this.loginForm.get('terms').invalid) {
      this.loaderService.show();

      this.facebookService.login()
        .subscribe(res => {
            this.loaderService.hide();
            this.redirectUser();
          },
          error => {
            this.loaderService.hide();
            this.dialogService.manageError(error);
          });
    } else {
      this.loginForm.get('terms').markAsTouched();
    }
  }

  redirectUser() {
    CookiesService.setValue('setItems', 'false');
    const redirectUrl = this.backUrl ? this.backUrl : environment.marketUrl;
    window.location.replace(redirectUrl);
  }

}
