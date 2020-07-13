import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LoginValidationMessages, LoginValidators} from '../../user/user-authentication/login/login.validations';
import {LoaderService} from '../../loader/loader-service/loader.service';
import {DialogService} from '../../dialog/dialog-service/dialog.service';
import {FacebookService} from '../../user/user-authentication/facebook.service';
import {UserDAO} from '../../user/user-dao.service';
import {auth, User} from 'firebase';
import {from} from 'rxjs';

@Component({
  selector: 'app-login-by-email',
  templateUrl: './login-by-email.component.html',
  styleUrls: ['./login-by-email.component.scss']
})
export class LoginByEmailComponent implements OnInit {
  loginForm: FormGroup;
  validationMessages = LoginValidationMessages;
  incomingData: {
    config: {
      userEmail: string,
      facebookButton: boolean,
      offersOption: boolean,
      passwordInfo: boolean,
      promoPokerTerms: boolean
    },
    appId: string,
    targetPageOrigin: string,
    ageGateDate: Date,
    origin: string
  };

  constructor(private loaderService: LoaderService, private dialogService: DialogService, private facebookService: FacebookService,
              private userDAO: UserDAO, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group(LoginValidators);
    this.incomingData = {
      config: {
        userEmail: null,
        facebookButton: true,
        offersOption: true,
        passwordInfo: false,
        promoPokerTerms: false
      },
      appId: null,
      targetPageOrigin: null,
      ageGateDate: null,
      origin: null
    };
  }

  ngOnInit(): void {
    window.addEventListener('message', (event: MessageEvent) => {
      if (event.data && event.data.method === 'getUserCustomToken') {
        this.incomingData = {
          config: {
            userEmail: event.data.config.userEmail,
            facebookButton: event.data.config.facebookButton,
            offersOption: event.data.config.offersOption,
            passwordInfo: event.data.config.passwordInfo,
            promoPokerTerms: event.data.config.promoPokerTerms
          },
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

  sendDataToParent(data) {
    if (window.parent && this.incomingData.targetPageOrigin) {
      window.parent.postMessage(data, this.incomingData.targetPageOrigin)
    }
  }

  closePopup() {

  }
}
