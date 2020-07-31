import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {LoginValidationMessages} from '../login/login.validations';
import SSOConfig from '../../single-sign-on/sso-config';
import {LoaderService} from '../../loader/loader-service/loader.service';
import {DialogService} from '../../dialog/dialog-service/dialog.service';
import {FacebookService} from '../facebook.service';
import {UserDAO} from '../../user/user-dao.service';
import {IframeMessagingService} from '../../shared/services/iframe-messaging.service';
import {SSOConfigService} from '../../single-sign-on/sso-config.service';
import {from, of} from 'rxjs';
import {auth} from 'firebase';
import {mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  validationMessages = LoginValidationMessages;
  config: SSOConfig;
  interests: any = {};

  constructor(private loaderService: LoaderService, private dialogService: DialogService, private facebookService: FacebookService,
              private userDAO: UserDAO, private formBuilder: FormBuilder, private iframeCommunicatorService: IframeMessagingService,
              private configService: SSOConfigService) {
  }

  ngOnInit(): void {
    this.configService.getConfig().subscribe(config => {
      this.config = config;
    })
  }

  loginWithFacebook() {
    const interests = this.toArray(this.interests);
    this.loaderService.show();

    from(auth().signInWithPopup(this.facebookService.facebookAuthProvider))
      .pipe(mergeMap((facebookResponse) => {
        const userData = this.facebookService.parseUserData(facebookResponse);

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
