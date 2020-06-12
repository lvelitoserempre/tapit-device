import {Component, OnInit} from '@angular/core';
import {auth} from 'firebase';
import {LoaderService} from '../../../loader/loader-service/loader.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss']
})
export class RecoveryPasswordComponent implements OnInit {
  stage = 'reset';
  email: string;

  constructor(private loaderService: LoaderService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.resetPassword();
  }

  resetPassword() {
    this.route.queryParams.subscribe(params => {
      if (params.mode === 'resetPassword') {
        const oobCode = params.oobCode;
        auth().verifyPasswordResetCode(oobCode)
          .then(email => {
            console.log(email);
          });
      }
    });
  }

  recoveryPassword() {
    this.loaderService.show();

    auth().sendPasswordResetEmail(this.email, {url: window.location.origin + '/app/auth/login'})
      .then(res => {
        this.stage = 'sentEmail';
        this.loaderService.hide();
      });
  }
}
