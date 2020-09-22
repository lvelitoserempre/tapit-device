import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import SSOConfig from '../../single-sign-on/sso-config';
import {LoaderService} from '../../loader/loader-service/loader.service';
import {DialogService} from '../../dialog/dialog-service/dialog.service';
import {FacebookService} from '../facebook.service';
import {UserDAO} from '../../user/user-dao.service';
import {IframeMessagingService} from '../../shared/services/iframe-messaging.service';
import {SSOConfigService} from '../../single-sign-on/sso-config.service';
import SignUpForm from './sign-up.form';
import {ActivatedRoute} from '@angular/router';
import {ScrollService} from '../../shared/services/scroll.service';
import {UserAgentService} from '../../../../../library/user-agent.service';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {I18nService} from 'src/app/shared/services/i18n.service';
import {GtmService} from '../../gtm.service';
import {Title} from '@angular/platform-browser';
import {AuthService} from '../auth.service';
import {UserAccount} from '../../user/user-account';
import {GoogleService} from '../google.service';
import AuthErrorService from '../auth-error.service';

declare var ga;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-CO'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class SignUpComponent implements OnInit, AfterViewInit {
  config: SSOConfig;
  interests: string[] = [];
  signUpForm: FormGroup;
  errorMessages = SignUpForm.ERROR_MESSAGES;
  interestsTouched: boolean = false;

  constructor(title: Title, private loaderService: LoaderService, private dialogService: DialogService, private facebookService: FacebookService,
              private googleService: GoogleService,
              private userDAO: UserDAO, private formBuilder: FormBuilder, private iframeCommunicatorService: IframeMessagingService,
              private configService: SSOConfigService, private route: ActivatedRoute, private _adapter: DateAdapter<any>,
              private i18n: I18nService, private authService: AuthService) {
    title.setTitle('TapIt - Registro')
    this.signUpForm = this.formBuilder.group(SignUpForm.CONFIG, {updateOn: 'blur'});
  }

  ngOnInit(): void {
    this.configService.getConfig().subscribe(config => {
      this.config = config;
      this._adapter.setLocale(this.i18n.getCurrentLanguage());

      if (!config.showCPFInput) {
        this.signUpForm.removeControl('cpf')
      }
    });
  }

  ngAfterViewInit() {
    this.route.queryParams.subscribe(queryParams => {
      if (queryParams.provider === 'facebook') {
        ScrollService.scrollToElement('facebook-button');
      }

      if (queryParams.provider === 'google') {
        ScrollService.scrollToElement('google-button');
      }
    });
  }

  signUp() {
    this.signUpForm.markAllAsTouched();
    this.interestsTouched = true;
    const interestsValidation = this.config.interests && this.config.interests.length ? true : false;
    const areInterestsValid = !interestsValidation ? true : (this.interests.length ? true : false);

    if (this.signUpForm.valid && areInterestsValid) {
      const formValue = this.signUpForm.value;
      this.loaderService.show();

      this.authService.signUp(formValue, this.config, this.interests)
        .subscribe((userAccount: UserAccount) => {
          ga('send', {hitType: 'event', eventCategory: 'signup', eventAction: 'signup-email', eventLabel: ''});
          GtmService.sendEvent(userAccount.id, 'signup_all_websites', 'signup_email');
          this.loaderService.hide();
        }, error => {
          this.loaderService.hide();
          this.dialogService.showErrorMessage(AuthErrorService.getErrorMessage(error)).subscribe();
        });
    }
  }

  signUpWithFacebook() {
    if (UserAgentService.isNotSupported()) {
      this.dialogService.showErrorMessage('El ingreso por facebook actualmente no esta soportado en este navegador. ' +
        'Por favor abre esta aplicación en el navegador haciendo click en el menu -> Abrir en navegador').subscribe();
      return;
    }

    this.signUpForm.get('acceptTerms').markAsTouched();

    if (this.signUpForm.get('acceptTerms').valid) {
      this.loaderService.show();

      this.facebookService.signUp(this.signUpForm.value, this.config.project, this.interests)
        .subscribe((userAccount: UserAccount) => {
          ga('send', {hitType: 'event', eventCategory: 'signup', eventAction: 'signup-facebook', eventLabel: ''});
          GtmService.sendEvent(userAccount.id, 'signup_all_websites', 'signup_facebook');
          this.loaderService.hide();
        }, error => {
          this.loaderService.hide();
          this.dialogService.showErrorMessage(AuthErrorService.getErrorMessage(error)).subscribe();
        });
    }
  }

  signUpWithGoogle() {
    this.signUpForm.get('acceptTerms').markAsTouched();

    if (this.signUpForm.get('acceptTerms').valid) {
      this.loaderService.show();

      this.googleService.signUp(this.signUpForm.value, this.config.project, this.interests)
        .subscribe(userAccount => {
          ga('send', {hitType: 'event', eventCategory: 'signup', eventAction: 'signup-google', eventLabel: ''});
          GtmService.sendEvent(userAccount.id, 'signup_all_websites', 'signup_google');
          this.loaderService.hide();
        }, error => {
          this.loaderService.hide();
          this.dialogService.showErrorMessage(AuthErrorService.getErrorMessage(error)).subscribe();
        });
    }
  }

  toggleInterest(key, $event) {
    this.interestsTouched = true;
    if ($event.target.checked) {
      this.interests.push(key);
    } else {
      const i = this.interests.indexOf(key);

      if (i >= 0) {
        this.interests.splice(i, 1);
      }
    }
  }
}
