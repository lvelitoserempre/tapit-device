import {Component, OnInit} from '@angular/core';
import {initializeApp} from 'firebase';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../user/user-authentication/user-authentication-service/auth.service';

declare var zE;

@Component({
  selector: 'app-root',
  templateUrl: './single-sign-on.component.html',
  styleUrls: ['./single-sign-on.component.scss']
})
export class SingleSignOnComponent implements OnInit {

  constructor(private authService: AuthService,) {
  }

  ngOnInit(): void {
    initializeApp(environment.firebase.config);
    this.authService.setupLoggedUserObserver();

    if (typeof zE === 'function') {
      zE('webWidget', 'hide');
    }
  }
}
