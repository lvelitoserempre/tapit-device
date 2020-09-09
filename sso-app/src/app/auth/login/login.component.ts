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
import {UserAgentService} from '../../../../../library/user-agent.service';
import {GtmService} from '../../gtm.service';
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

  constructor(private loaderService: LoaderService, private dialogService: DialogService, private facebookService: FacebookService,
              private userDAO: UserDAO, private formBuilder: FormBuilder, private iframeMessagingService: IframeMessagingService,
              private configService: SSOConfigService, private router: Router, private route: ActivatedRoute,
              private authService: AuthService) {
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
      from(auth().signInWithEmailAndPassword(formValue.email, formValue.password))
        .subscribe(userCredential => {
          if (formValue.remember) {
            this.rememberUser(formValue.email);
          } else {
            this.authService.removeRememberMe();
          }

          ga('send', {hitType: 'event', eventCategory: 'login', eventAction: 'login-email', eventLabel: ''});
          GtmService.sendEvent(userCredential.user.uid, 'login_all_websites', 'login_email')
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
      .subscribe(userCredential => {
          ga('send', {hitType: 'event', eventCategory: 'login', eventAction: 'login-facebook', eventLabel: ''});
        GtmService.sendEvent(userCredential.user.uid, 'login_all_websites', 'login_facebook')
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

  rememberUser(email: string) {
    this.authService.setRememberMeValue(email);
    this.callAutoCompleteFields();
  }

  callAutoCompleteFields() {
    const fields = document.querySelectorAll('input[type="password"]')
    fields.forEach((field: any) => field.autocomplete = 'on');
  }
}
