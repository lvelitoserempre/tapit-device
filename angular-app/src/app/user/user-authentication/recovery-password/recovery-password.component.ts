import {Component, OnInit} from '@angular/core';
import {auth} from 'firebase';
import {LoaderService} from '../../../loader/loader-service/loader.service';
import {ActivatedRoute} from '@angular/router';
import {DialogService} from '../../../dialog/dialog-service/dialog.service';
import RecoveryPasswordErrorService from './recovery-password-error.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss']
})
export class RecoveryPasswordComponent implements OnInit {
  stage: string;
  email: string;
  resetEmail: string;
  newPassword: string;
  private oobCode: string;

  constructor(private loaderService: LoaderService, private route: ActivatedRoute, private dialogService: DialogService) {
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
    this.loaderService.show();

    auth().verifyPasswordResetCode(this.oobCode).then(email => {
      this.stage = 'setNewPassword';
      this.resetEmail = email;
    }).catch(error => {
      this.stage = 'linkLapsed';
    }).finally(() => this.loaderService.hide());
  }

  recoveryPassword() {
    if (this.email) {
      this.loaderService.show();

      auth().sendPasswordResetEmail(this.email, {url: window.location.origin + '/app/auth/login'}).then(res => {
        this.stage = 'sentEmail';
      }).catch(error => {
        this.dialogService.showErrorMessage(RecoveryPasswordErrorService.getErrorMessage(error));
      }).finally(() => this.loaderService.hide());
    } else {
      this.dialogService.showErrorMessage('El email ingresado es inválido. Intenta de nuevo');
    }
  }

  setNewPassword() {
    this.loaderService.show();

    auth().confirmPasswordReset(this.oobCode, this.newPassword).then(res => {
      this.stage = 'passwordChanged';
    }).catch(error => {
      this.dialogService.showErrorMessage(RecoveryPasswordErrorService.getErrorMessage(error));
    }).finally(() => this.loaderService.hide());
  }
}
