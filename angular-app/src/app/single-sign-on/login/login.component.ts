import {Component, OnInit} from '@angular/core';
import {LoaderService} from '../../loader/loader-service/loader.service';
import {DialogService} from '../../dialog/dialog-service/dialog.service';
import {FacebookService} from '../../user/user-authentication/facebook.service';
import {UserDAO} from '../../user/user-dao.service';
import {auth} from 'firebase';
import {from, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IframeCommunicatorService} from '../iframe-communicator.service';
import SSOConfig from '../sso-config';
import {ConfigService} from '../config.service';
import {LoginValidationMessages, LoginValidators} from './login.validations';

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
              private userDAO: UserDAO, private formBuilder: FormBuilder, private iframeCommunicatorService: IframeCommunicatorService,
              private configService: ConfigService) {
    this.loginForm = this.formBuilder.group(LoginValidators, {updateOn: 'blur'});
  }

  ngOnInit(): void {
    this.configService.getConfig().subscribe(config => {
      this.config = config;
    })
  }


  login() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      this.loaderService.show();

      from(auth().signInWithEmailAndPassword(formValue.email, formValue.password))
        .subscribe(user => {

        }, error => {
          this.loaderService.hide();
          this.dialogService.manageError(error);
        });
    }
  }

  loginWithFacebook() {
    this.loaderService.show();

    from(auth().signInWithPopup(this.facebookService.facebookAuthProvider))
      .pipe(mergeMap((facebookResponse) => {
        const userData = this.facebookService.parseUserData(facebookResponse);

        if (this.config.origin) {
          userData.origin = this.config.origin;
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
