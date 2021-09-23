import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {environment} from '../environments/environment';
import {CookiesService} from '../../../library/cookies.service';
import firebase from 'firebase/app';
import initializeApp = firebase.initializeApp;
import { RemoteConfigService } from './services/remote-config.service';
import { DOCUMENT } from '@angular/common';

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
    private remoteConfigService: RemoteConfigService,
    @Inject(DOCUMENT) private doc: any
  ) { }

  ngOnInit(): void {
    this.remoteConfigService.getValues();
    this.authService.setupLoggedUserObserver();
    this.redirectIfUserIsAChild();
    this.setUpStats()
    this.setGTagManager();
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

  private setGTagManager() {
    const s = this.doc.createElement('script');
    s.type = 'text/javascript';
    s.src = "https://maps.googleapis.com/maps/api/js?key="+environment.firebase.config.apiKey+"&libraries=geometry";
    const head = this.doc.getElementsByTagName('body')[0];
    head.appendChild(s);
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
