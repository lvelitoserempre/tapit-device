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
import UserCredential = firebase.auth.UserCredential;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, AfterViewInit {
  config: SSOConfig;
  interests: string[] = [];
  signUpForm: FormGroup;
  errorMessages = SignUpForm.ERROR_MESSAGES;

  constructor(private loaderService: LoaderService, private dialogService: DialogService, private facebookService: FacebookService,
              private userDAO: UserDAO, private formBuilder: FormBuilder, private iframeCommunicatorService: IframeMessagingService,
              private configService: SSOConfigService, private route: ActivatedRoute) {
    this.signUpForm = this.formBuilder.group(SignUpForm.CONFIG, {updateOn: 'blur'});
  }

  ngOnInit(): void {
    this.configService.getConfig().subscribe(config => {
      this.config = config;
      this.signUpForm.get('acceptOffers').setValue(this.config.preCheckOffers);
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

    if (this.signUpForm.valid) {
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
