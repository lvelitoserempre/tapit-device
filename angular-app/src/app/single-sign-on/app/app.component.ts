import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../user/user-authentication/user-authentication-service/auth.service';
import {IframeCommunicatorService} from '../iframe-communicator.service';
import {initializeApp} from 'firebase';
import {environment} from '../../../environments/environment';

declare var zE;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private iframeCommunicatorService: IframeCommunicatorService) {
  }

  ngOnInit(): void {
    initializeApp(environment.firebase.config);
    this.authService.setupLoggedUserObserver();

    this.authService.getCurrentUser()
      .subscribe(user => {
        this.iframeCommunicatorService.sendDataToParent('setLoggedUser', user);
      })

    if (typeof zE === 'function') {
      zE('webWidget', 'hide');
    }
  }
}
