import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import SSOConfig from '../../single-sign-on/sso-config';
import {LoaderService} from '../../loader/loader-service/loader.service';
import {DialogService} from '../../dialog/dialog-service/dialog.service';
import {FacebookService} from '../facebook.service';
import {UserDAO} from '../../user/user-dao.service';
import {IframeMessagingService} from '../../shared/services/iframe-messaging.service';
import {SSOConfigService} from '../../single-sign-on/sso-config.service';
import {from, of} from 'rxjs';
import {auth} from 'firebase';
import {mergeMap, switchMap} from 'rxjs/operators';
import SignUpForm from './sign-up.form';
import {SignUpService} from '../sign-up.service';
import UserCredential = firebase.auth.UserCredential;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  config: SSOConfig;
  interests: any = {};
  signUpForm: FormGroup;
  errorMessages = SignUpForm.ERROR_MESSAGES;

  constructor(private loaderService: LoaderService, private dialogService: DialogService, private facebookService: FacebookService,
              private userDAO: UserDAO, private formBuilder: FormBuilder, private iframeCommunicatorService: IframeMessagingService,
              private configService: SSOConfigService) {
    this.signUpForm = this.formBuilder.group(SignUpForm.CONFIG, {updateOn: 'blur'});
  }

  ngOnInit(): void {
    this.configService.getConfig().subscribe(config => {
      this.config = config;
    })

    auth().signOut();
  }

  signUp() {
    this.signUpForm.markAllAsTouched();

    if (this.signUpForm.valid) {
      const formValue = this.signUpForm.value;
      this.loaderService.show();

      from(auth().createUserWithEmailAndPassword(formValue.email, formValue.password))
        .pipe(switchMap((userCredential: UserCredential) => {
          return this.userDAO.createUser(SignUpService.parseUserData(formValue, this.config.project));
        }))
        .subscribe(user => {

        }, error => {
          this.loaderService.hide();
          this.dialogService.manageError(error);
        });
    }
  }

  signUpWithFacebook() {
    const interests = this.toArray(this.interests);
    this.loaderService.show();

    from(auth().signInWithPopup(this.facebookService.facebookAuthProvider))
      .pipe(mergeMap((facebookResponse) => {
        const userData = FacebookService.parseUserData(facebookResponse);

        if (this.config.project) {
          userData.origin = this.config.project;
        }

        if (interests && interests.length) {
          userData.interests = interests;
        }

        return facebookResponse.additionalUserInfo.isNewUser ? this.userDAO.createUser(userData) : of();
      })).subscribe(customToken => {
      },
      error => {
        this.loaderService.hide();
        this.dialogService.manageError(error);
        auth().signOut();
      });
  }

  toArray(object) {
    const array = [];

    if (object) {
      for (const interestKey of Object.keys(object)) {
        if (object[interestKey]) {
          array.push(interestKey);
        }
      }
    }

    return array;
  }
}
