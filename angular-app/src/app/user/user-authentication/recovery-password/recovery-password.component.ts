import {Component, OnInit} from '@angular/core';
import {auth} from 'firebase';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss']
})
export class RecoveryPasswordComponent implements OnInit {
  email: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  resetPassword() {
    auth().sendPasswordResetEmail(this.email, {url: window.location.origin + '/app/auth/login'})
      .then(res => {
        console.log(res);
      });
  }
}
