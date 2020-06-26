import {Component, OnInit} from '@angular/core';
import {LoaderService} from '../../loader/loader-service/loader.service';
import {DialogService} from '../../dialog/dialog-service/dialog.service';
import {FacebookService} from '../../user/user-authentication/facebook.service';
import {UserDAO} from '../../user/user-dao.service';
import {auth, User} from 'firebase';
import {from, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LoginValidationMessages, LoginValidators} from '../../user/user-authentication/login/login.validations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  validationMessages = LoginValidationMessages;
  incomingData: {
    appId: string,
    targetPageOrigin: string,
    ageGateDate: Date,
    origin: string
  };

  constructor(private loaderService: LoaderService, private dialogService: DialogService, private facebookService: FacebookService,
              private userDAO: UserDAO, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group(LoginValidators);
  }

  ngOnInit(): void {
    window.addEventListener('message', (event: MessageEvent) => {
      if (event.data && event.data.method === 'getUserCustomToken') {
        this.incomingData = {
          appId: event.data.appId,
          ageGateDate: new Date(event.data.ageGateDate),
          origin: event.data.origin,
          targetPageOrigin: event.origin
        };

        auth().onAuthStateChanged((user: User) => {
          if (user) {
            this.userDAO.getCustomToken().subscribe((res: any) => {
              this.sendDataToParent({
                appId: this.incomingData.appId,
                customToken: res.customToken
              });
            });
          } else {
            this.sendDataToParent(null);
          }
        });
      }
    }, false);
  }

  login() {
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


  loginWithFacebook() {
    if (!this.loginForm.get('terms').invalid) {
      this.loaderService.show();

      from(auth().signInWithPopup(this.facebookService.facebookAuthProvider))
        .pipe(mergeMap((facebookResponse) => {
          const userData = this.facebookService.parseUserData(facebookResponse);

          if (this.incomingData.origin) {
            userData.origin = this.incomingData.origin;
          }

          return facebookResponse.additionalUserInfo.isNewUser ? this.userDAO.createUser(userData) : of();
        })).subscribe(customToken => {
          this.loaderService.hide();
        },
        error => {
          this.loaderService.hide();
          this.dialogService.manageError(error);
        });
    } else {
      this.loginForm.get('terms').markAsTouched();
    }
  }

  sendDataToParent(data) {
    if (window.parent && this.incomingData.targetPageOrigin) {
      window.parent.postMessage(data, this.incomingData.targetPageOrigin)
    }
  }
}
