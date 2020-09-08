import {Component, OnInit} from '@angular/core';
import {LoaderService} from '../../loader/loader-service/loader.service';
import {DialogService} from '../../dialog/dialog-service/dialog.service';
import {auth} from 'firebase';
import {from} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import SSOConfig from '../../single-sign-on/sso-config';
import {SSOConfigService} from '../../single-sign-on/sso-config.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RecoverPasswordValidationMessages, RecoverPasswordValidators} from './recover-password.validations';
import {GtmService} from '../../gtm.service';


@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  recoverPasswordForm: FormGroup;
  validationMessages = RecoverPasswordValidationMessages;
  config: SSOConfig;
  emailSent = false;

  constructor(private loaderService: LoaderService, private dialogService: DialogService, private formBuilder: FormBuilder,
              private configService: SSOConfigService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.recoverPasswordForm = this.formBuilder.group(RecoverPasswordValidators, {updateOn: 'blur'});
    const email = this.activatedRoute.snapshot.params['email'] || '';
    this.recoverPasswordForm.controls['email'].setValue(email);
    if (email !== '') {
      this.recoverPasswordForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.configService.getConfig().subscribe(config => {
      this.config = config;
    });
  }

  recoverPassword() {
    this.recoverPasswordForm.markAllAsTouched();

    if (this.recoverPasswordForm.valid) {
      const formValue = this.recoverPasswordForm.value;
      this.loaderService.show();
      from(auth().sendPasswordResetEmail(formValue.email))
        .subscribe(resp => {
          this.emailSent = true;
          GtmService.sendEvent('recover_password_all_websites', 'recover_password');
          this.loaderService.hide();
        }, error => {
          this.loaderService.hide();
          this.dialogService.manageError(error);
        });
    }
  }

  returnToLogin() {
    this.router.navigateByUrl('login');
  }

}
