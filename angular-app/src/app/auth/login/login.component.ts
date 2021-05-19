import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {DialogService} from '../../dialog/dialog-service/dialog.service';
import {LoginValidationMessages, LoginValidators} from './login.validations';
import {FacebookService} from '../facebook.service';
import AuthErrorService from '../../auth-error.service';
import {LoadingService} from '../../loading.service';
import {from} from 'rxjs';
import firebase from 'firebase';
import auth = firebase.auth;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  validationMessages = LoginValidationMessages;
  private backUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private dialogService: DialogService,
    private userAuthenticationService: AuthService,
    private facebookService: FacebookService
  ) {
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

      this.loadingService.show();

      from(auth().signInWithEmailAndPassword(email, password))
        .subscribe(user => {
            this.loadingService.hide();
            this.redirectUser();
          },
          error => {
            this.loadingService.hide();
            this.dialogService.showErrorMessage(AuthErrorService.getErrorMessage(error));
          });
    }
  }

  loginWithFacebook() {
    this.loginForm.markAsUntouched();
    this.loginForm.get('terms').markAsTouched();

    if (this.loginForm.get('terms').valid) {
      this.loadingService.show();

      this.facebookService.login()
        .subscribe(user => {
            this.loadingService.hide();
            this.redirectUser();
          },
          error => {
            this.loadingService.hide();
            this.dialogService.showErrorMessage(AuthErrorService.getErrorMessage(error));
          });
    }
  }

  redirectUser() {
    this.router.navigate(['user/profile'])
  }

}
