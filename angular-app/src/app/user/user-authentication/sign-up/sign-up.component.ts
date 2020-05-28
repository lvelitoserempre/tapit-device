import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LoaderService} from 'src/app/loader/loader-service/loader.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from 'src/app/dialog/dialog-service/dialog.service';
import {SignUpValidationMessages, SignUpValidators} from './sign-up.validations';
import {SignUpService} from '../sign-up.service';
import {FacebookService} from '../facebook.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  validationMessages = SignUpValidationMessages;
  private backUrl: string;

  constructor(private formBuilder: FormBuilder, private signUpService: SignUpService, private facebookService: FacebookService,
              private router: Router, private route: ActivatedRoute, private loaderService: LoaderService,
              private dialogService: DialogService) {
    this.signUpForm = this.formBuilder.group(SignUpValidators);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      this.backUrl = queryParams.backUrl;
    });
  }


  signUp() {
    this.loaderService.show();
    this.signUpService.signUp(this.signUpForm.value)
      .subscribe(res => {
          this.loaderService.hide();
          this.router.navigate(['/']);
        },
        error => {
          this.loaderService.hide();
          this.dialogService.manageError(error);
        });
  }

  loginWithFacebook() {
    this.loaderService.show();
    this.facebookService.login()
      .subscribe(res => {
          this.loaderService.hide();
          this.redirectUser();
        },
        error => {
          this.loaderService.hide();
          this.dialogService.manageError(error);
        });
  }

  redirectUser() {
    const redirectUrl = this.backUrl ? this.backUrl : (environment.production ? 'https://market.tapit.com.co' : 'https://market-dev.tapit.com.co');
    window.location.replace(redirectUrl);
  }
}
