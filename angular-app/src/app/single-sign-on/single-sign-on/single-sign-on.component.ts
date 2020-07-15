import {Component, OnInit} from '@angular/core';
import {initializeApp} from 'firebase';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../user/user-authentication/user-authentication-service/auth.service';
import {IframeCommunicatorService} from '../iframe-communicator.service';

@Component({
  selector: 'app-root',
  templateUrl: './single-sign-on.component.html',
  styleUrls: ['./single-sign-on.component.scss']
})
export class SingleSignOnComponent implements OnInit {

  constructor(private authService: AuthService, private iframeCommunicatorService: IframeCommunicatorService) {
  }

  ngOnInit(): void {
    initializeApp(environment.firebase.config);
    this.authService.setupLoggedUserObserver();
    this.iframeCommunicatorService.setUpCommunicationListener();
  }
}
