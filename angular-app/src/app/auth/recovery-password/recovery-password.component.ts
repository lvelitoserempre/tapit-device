import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DialogService} from '../../dialog/dialog-service/dialog.service';
import RecoveryPasswordErrorService from './recovery-password-error.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import firebase from 'firebase/app';
import 'firebase/auth';
import { LoadingService } from 'src/app/services/loading.service';
import auth = firebase.auth;

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss']
})
export class RecoveryPasswordComponent implements OnInit {
  stage: string;
  resetEmail: string;
  emailForm: FormGroup;
  passwordForm: FormGroup;
  private oobCode: string;

  constructor(
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    formBuilder: FormBuilder
  ) {
    this.emailForm = formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    }, {updateOn: 'blur'});

    this.passwordForm = formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]]
    }, {updateOn: 'blur'});
  }

  ngOnInit(): void {
    this.resetPassword();
  }

  resetPassword() {
    this.route.queryParams.subscribe(params => {
      if (params.mode === 'resetPassword') {
        this.showNewPasswordForm(params.oobCode);
      }
    });
  }

  showNewPasswordForm(oobCode: string) {
    this.oobCode = oobCode;
    this.loadingService.show();

    auth().verifyPasswordResetCode(this.oobCode).then(email => {
      this.stage = 'setNewPassword';
      this.resetEmail = email;
    }).catch(error => {
      this.stage = 'linkLapsed';
    }).finally(() => this.loadingService.hide());
  }

  recoveryPassword() {
    this.emailForm.markAllAsTouched();

    if (this.emailForm.valid) {
      this.loadingService.show();

      auth().sendPasswordResetEmail(this.emailForm.controls.email.value, {url: window.location.origin}).then(res => {
        this.stage = 'sentEmail';
      }).catch(error => {
        this.dialogService.showErrorMessage(RecoveryPasswordErrorService.getErrorMessage(error));
      }).finally(() => this.loadingService.hide());
    }
  }

  setNewPassword() {
    this.passwordForm.markAllAsTouched();

    if (this.passwordForm.valid) {
      this.loadingService.show();

      auth().confirmPasswordReset(this.oobCode, this.passwordForm.controls.password.value).then(res => {
        this.stage = 'passwordChanged';
      }).catch(error => {
        this.dialogService.showErrorMessage(RecoveryPasswordErrorService.getErrorMessage(error));
      }).finally(() => this.loadingService.hide());
    }
  }
}
