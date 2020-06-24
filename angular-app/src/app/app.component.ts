import { Component, OnInit } from '@angular/core';
import { AuthService } from './user/user-authentication/user-authentication-service/auth.service';
import { environment } from '../environments/environment';
import { auth, initializeApp, User } from 'firebase';
import { UserDAO } from './user/user-dao.service';
import { CookiesService } from './services/cookies.service';

declare var tagManager;
declare var ga;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private userDAO: UserDAO) {
  }

  ngOnInit(): void {
    initializeApp(environment.firebase.config);
    this.authService.setupLoggedUserObserver();
    this.redirectIfUserIsAChild();
    this.setUpStats();
  }

  /**
   * This method redirects the user to the root in production if the user has not entered his birth date
   */
  private redirectIfUserIsAChild() {
    console.log(CookiesService.getValue('anonymousUserBirthDate'));

    if (!CookiesService.getValue('anonymousUserBirthDate') && window.location.hostname !== 'localhost') {
      window.location.replace(window.location.origin);
    } else if (CookiesService.getValue('anonymousUserBirthDate') && CookiesService.getValue('loggedUser') && (window.location.pathname == '/' || window.location.pathname == '/app/')) {
      this.redirectUserToMarket()
    }
  }
  private redirectUserToMarket() {
    window.location.replace(environment.marketUrl);
  }

  private setUpStats() {
    tagManager(window, document, 'script', 'dataLayer', environment.googleTagManagerId);
    ga('create', environment.googleAnalyticsId, 'auto');
  }
}
