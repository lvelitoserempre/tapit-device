import {Component, OnInit} from '@angular/core';
import {LoaderService} from '../../loader/loader-service/loader.service';
import {DialogService} from '../../dialog/dialog-service/dialog.service';
import {FacebookService} from '../facebook.service';
import {UserDAO} from '../../user/user-dao.service';
import {auth} from 'firebase';
import {from} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IframeMessagingService} from '../../shared/services/iframe-messaging.service';
import SSOConfig from '../../single-sign-on/sso-config';
import {SSOConfigService} from '../../single-sign-on/sso-config.service';
import {LoginValidationMessages, LoginValidators} from './login.validations';
import {ActivatedRoute, Router} from '@angular/router';
import {AUTH_ERRORS} from 'src/app/auth/auth-error.enum';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  validationMessages = LoginValidationMessages;
  config: SSOConfig;

  constructor(private loaderService: LoaderService, private dialogService: DialogService, private facebookService: FacebookService,
              private userDAO: UserDAO, private formBuilder: FormBuilder, private iframeMessagingService: IframeMessagingService,
              private configService: SSOConfigService, private router: Router, private route: ActivatedRoute, private authService: AuthService) {
    this.loginForm = this.formBuilder.group(LoginValidators, {updateOn: 'blur'});
  }

  ngOnInit(): void {
    this.configService.getConfig().subscribe(config => {
      this.config = config;
    });
  }


  login() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      this.loaderService.show();

      from(auth().signInWithEmailAndPassword(formValue.email, formValue.password))
        .subscribe(user => {
          this.loaderService.hide();
        }, error => {
          this.loaderService.hide();
          this.dialogService.manageError(error);
        });
    }
  }

  loginWithFacebook() {
    if (this.facebookService.isInstagram()) {
      return;
    }

    this.loaderService.show();

    this.facebookService.login()
      .subscribe(customToken => {
        this.loaderService.hide();
      }, error => {
        this.loaderService.hide();
        this.dialogService.manageError(error);
        if (error.code !== AUTH_ERRORS.ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL) {
          this.router.navigateByUrl('sign-up?provider=facebook');
        }
      });
  }

  recoverPassword() {
    this.router.navigateByUrl('recover-password/' + this.loginForm.value.email);
  }
}
