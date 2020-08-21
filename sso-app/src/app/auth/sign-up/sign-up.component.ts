import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import SSOConfig from '../../single-sign-on/sso-config';
import {LoaderService} from '../../loader/loader-service/loader.service';
import {DialogService} from '../../dialog/dialog-service/dialog.service';
import {FacebookService} from '../facebook.service';
import {UserDAO} from '../../user/user-dao.service';
import {IframeMessagingService} from '../../shared/services/iframe-messaging.service';
import {SSOConfigService} from '../../single-sign-on/sso-config.service';
import {from} from 'rxjs';
import {auth} from 'firebase';
import {switchMap} from 'rxjs/operators';
import SignUpForm from './sign-up.form';
import {SignUpService} from '../sign-up.service';
import {ActivatedRoute} from '@angular/router';
import {ScrollService} from '../../shared/services/scroll.service';
import {UserAgentService} from '../../../../../library/user-agent.service';
import UserCredential = firebase.auth.UserCredential;
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { I18nService } from 'src/app/shared/services/i18n.service';

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
  interestsTouched:boolean = false;
  
  constructor(private loaderService: LoaderService, private dialogService: DialogService, private facebookService: FacebookService,
              private userDAO: UserDAO, private formBuilder: FormBuilder, private iframeCommunicatorService: IframeMessagingService,
              private configService: SSOConfigService, private route: ActivatedRoute, private _adapter: DateAdapter<any>,
              private i18n: I18nService ) {
    this.signUpForm = this.formBuilder.group(SignUpForm.CONFIG, {updateOn: 'blur'});
  }

  ngOnInit(): void {
    this.configService.getConfig().subscribe(config => {
      this.config = config;
      this.signUpForm.get('acceptOffers').setValue(this.config.preCheckOffers);
      this._adapter.setLocale(this.i18n.getCurrentLanguage());
    });
  }

  ngAfterViewInit() {
    this.route.queryParams.subscribe(queryParams => {
      if (queryParams.provider === 'facebook') {
        ScrollService.scrollToElement('facebook-button');
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
      from(auth().createUserWithEmailAndPassword(formValue.email, formValue.password))
        .pipe(switchMap((userCredential: UserCredential) => {
          return this.userDAO.createUser(SignUpService.extractFormUserData(formValue, this.config.project, this.interests));
        }))
        .subscribe(user => {
          this.loaderService.hide();
        }, error => {
          this.loaderService.hide();
          this.dialogService.manageError(error);
          auth().currentUser.delete().then((res) => console.log('user deleted', res));
        });
    }
  }

  signUpWithFacebook() {
    if (UserAgentService.isNotSupported()) {
      this.dialogService.showErrorMessage('El ingreso por facebook actualmente no esta soportado en este navegador. ' +
        'Por favor abre esta aplicación en el navegador haciendo click en el menu -> Abrir en navegador');
      return;
    }

    this.signUpForm.get('acceptTerms').markAsTouched();

    if (this.signUpForm.get('acceptTerms').valid) {
      this.loaderService.show();

      this.facebookService.signUp(this.signUpForm.value, this.config.project, this.interests)
        .subscribe(customToken => {
          this.loaderService.hide();
        }, error => {
          this.loaderService.hide();
          this.dialogService.manageError(error);
          auth().currentUser.delete().then();
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
