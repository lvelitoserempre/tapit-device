import {Component, OnInit} from '@angular/core';
import {LoaderService} from '../../loader/loader-service/loader.service';
import {DialogService} from '../../dialog/dialog-service/dialog.service';
import {FacebookService} from '../facebook.service';
import {UserDAO} from '../../user/user-dao.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IframeMessagingService} from '../../shared/services/iframe-messaging.service';
import SSOConfig from '../../single-sign-on/sso-config';
import {SSOConfigService} from '../../single-sign-on/sso-config.service';
import {LoginValidationMessages, LoginValidators} from './login.validations';
import {ActivatedRoute, Router} from '@angular/router';
import {AUTH_ERRORS} from 'src/app/auth/auth-error.enum';
import {AuthService} from '../auth.service';
import {UserAgentService} from '../../../../../library/user-agent.service';
import {GtmService} from '../../gtm.service';
import {UserAccount} from '../../user/user-account';
import {Title} from '@angular/platform-browser';
import {GoogleService} from '../google.service';

declare var ga;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  validationMessages = LoginValidationMessages;
  config: SSOConfig;

  constructor(title: Title, private loaderService: LoaderService, private dialogService: DialogService,
              private facebookService: FacebookService,
              private googleService: GoogleService,
              private userDAO: UserDAO, private formBuilder: FormBuilder, private iframeMessagingService: IframeMessagingService,
              private configService: SSOConfigService, private router: Router, private route: ActivatedRoute,
              private authService: AuthService) {
    title.setTitle('TapIt - Iniciar Sesión')
    this.loginForm = this.formBuilder.group(LoginValidators, {updateOn: 'blur'});
  }

  ngOnInit(): void {
    this.configService.getConfig().subscribe(config => {
      this.config = config;
    });
    if (this.authService.getRememberMeValue().length) {
      this.callAutoCompleteFields();
      this.loginForm.controls['remember'].setValue(true);
    }
  }


  login() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      this.loaderService.show();

      this.authService.login(formValue.email, formValue.password)
        .subscribe((user: UserAccount) => {
          if (formValue.remember) {
            this.rememberUser(formValue.email);
          } else {
            this.authService.removeRememberMe();
          }

          ga('send', {hitType: 'event', eventCategory: 'login', eventAction: 'login-email', eventLabel: ''});
          GtmService.sendEvent(user.id, 'login_all_websites', 'login_email')
          this.loaderService.hide();
        }, error => {
          this.loaderService.hide();
          this.dialogService.manageError(error);
        });
    }
  }

  loginWithFacebook() {
    if (UserAgentService.isNotSupported()) {
      this.dialogService.showErrorMessage('El ingreso por facebook actualmente no esta soportado en este navegador. ' +
        'Por favor abre esta aplicación en el navegador haciendo click en el menu -> Abrir en navegador');
      return;
    }

    this.loaderService.show();

    this.facebookService.login()
      .subscribe((userAccount: UserAccount) => {
        console.log(userAccount)
        ga('send', {hitType: 'event', eventCategory: 'login', eventAction: 'login-facebook', eventLabel: ''});
        GtmService.sendEvent(userAccount.id, 'login_all_websites', 'login_facebook')
        this.loaderService.hide();
      }, error => {
        this.loaderService.hide();
        this.dialogService.manageError(error);
        if (error.code !== AUTH_ERRORS.ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL) {
          this.router.navigateByUrl('sign-up?provider=facebook');
        }
      });
  }

  loginWithGoogle() {
    this.loaderService.show();

    this.googleService.login()
      .subscribe(userAccount => {
        ga('send', {hitType: 'event', eventCategory: 'login', eventAction: 'login-google', eventLabel: ''});
        GtmService.sendEvent(userAccount.id, 'login_all_websites', 'login_google')
        this.loaderService.hide();
      }, error => {
        this.loaderService.hide();
        this.dialogService.manageError(error);
        if (error.code !== AUTH_ERRORS.ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL) {
          this.router.navigateByUrl('sign-up?provider=google');
        }
      });

  }

  recoverPassword() {
    this.router.navigateByUrl('recover-password/' + this.loginForm.value.email);
  }

  rememberUser(email: string) {
    this.authService.setRememberMeValue(email);
    this.callAutoCompleteFields();
  }

  callAutoCompleteFields() {
    const fields = document.querySelectorAll('input[type="password"]')
    fields.forEach((field: any) => field.autocomplete = 'on');
  }

}
