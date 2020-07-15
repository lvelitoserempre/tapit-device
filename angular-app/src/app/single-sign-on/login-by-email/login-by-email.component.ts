import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LoaderService} from '../../loader/loader-service/loader.service';
import {DialogService} from '../../dialog/dialog-service/dialog.service';
import {FacebookService} from '../../user/user-authentication/facebook.service';
import {UserDAO} from '../../user/user-dao.service';
import {auth} from 'firebase';
import {from} from 'rxjs';
import {LoginByEmailValidationMessages, LoginByEmailValidators} from './login-by-email.validations';
import {IframeCommunicatorService} from '../iframe-communicator.service';
import LoginConfig from '../login.config';

@Component({
  selector: 'app-login-by-email',
  templateUrl: './login-by-email.component.html',
  styleUrls: ['./login-by-email.component.scss']
})
export class LoginByEmailComponent implements OnInit {
  loginForm: FormGroup;
  validationMessages = LoginByEmailValidationMessages;
  config: LoginConfig = {};

  constructor(private loaderService: LoaderService, private dialogService: DialogService, private facebookService: FacebookService,
              private userDAO: UserDAO, private formBuilder: FormBuilder, private iframeCommunicatorService: IframeCommunicatorService) {
    this.loginForm = this.formBuilder.group(LoginByEmailValidators, {updateOn: 'blur'});
  }

  ngOnInit(): void {
    this.iframeCommunicatorService.config.subscribe(config => {
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
          //this.loaderService.hide();
        }, error => {
          this.loaderService.hide();
          this.dialogService.manageError(error);
        });
    }
  }
}
