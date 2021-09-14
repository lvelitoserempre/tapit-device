import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {environment} from '../environments/environment';
import {CookiesService} from '../../../library/cookies.service';
import firebase from 'firebase/app';
import initializeApp = firebase.initializeApp;
import { RemoteConfigService } from './services/remote-config.service';

declare var setupGTM;
declare var ga;
declare var fbq: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private remoteConfigService: RemoteConfigService
  ) { }

  ngOnInit(): void {
    this.remoteConfigService.getValues();
    this.authService.setupLoggedUserObserver();
    this.redirectIfUserIsAChild();
    this.setUpStats()
  }

  /**
   * This method redirects the user to the root in production if the user has not entered his birth date
   */
  private redirectIfUserIsAChild() {
    this.authService.getCurrentUser()
      .subscribe(user => user => {
        console.log('listener', user)
        if (!user) {
          if (window.location.hostname !== 'localhost') {
            if (!CookiesService.getValue('anonymousUserBirthDate')) {
              window.location.replace(window.location.origin);
            }
          }
        }
      });
  }

  private redirectUserToMarket() {
    window.location.replace(environment.marketUrl);
  }

  private setUpStats() {
    setupGTM(window, document, 'script', 'dataLayer', environment.googleTagManagerId);
    ga('create', environment.googleAnalyticsId, 'auto');
    fbq('init', environment.facebookPixelId);
    fbq('track', 'PageView');
  }
}
