import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LoginValidationMessages, LoginValidators} from '../login/login.validations';
import SSOConfig from '../sso-config';
import {LoaderService} from '../../loader/loader-service/loader.service';
import {DialogService} from '../../dialog/dialog-service/dialog.service';
import {FacebookService} from '../../user/user-authentication/facebook.service';
import {UserDAO} from '../../user/user-dao.service';
import {IframeMessagingService} from '../iframe-messaging.service';
import {ConfigService} from '../config.service';
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

  constructor(private loaderService: LoaderService, private dialogService: DialogService, private facebookService: FacebookService,
              private userDAO: UserDAO, private formBuilder: FormBuilder, private iframeCommunicatorService: IframeMessagingService,
              private configService: ConfigService) {
  }

  ngOnInit(): void {
    this.configService.getConfig().subscribe(config => {
      this.config = config;
    })
  }

  loginWithFacebook() {
    this.loaderService.show();

    from(auth().signInWithPopup(this.facebookService.facebookAuthProvider))
      .pipe(mergeMap((facebookResponse) => {
        const userData = this.facebookService.parseUserData(facebookResponse);

        if (this.config.project) {
          userData.origin = this.config.project;
        }

        return facebookResponse.additionalUserInfo.isNewUser ? this.userDAO.createUser(userData) : of();
      })).subscribe(customToken => {

      },
      error => {
        this.loaderService.hide();
        this.dialogService.manageError(error);
      });
  }

}
