import {Component, OnInit} from '@angular/core';
import {UserService} from './user/user.service';
import {Router} from '@angular/router';
import {environment} from '../environments/environment';

declare var tagManager;
declare var ga;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.userService.setupLoggedUserObserver();

    this.redirectIfUserIsAChild();
    this.setUpStats();
  }

  /**
   * This method redirects the user to the root in production if the user has not entered his birth date
   */
  private redirectIfUserIsAChild() {
    if (!window.localStorage.getItem('anonymousUserBirthDate') && window.location.hostname !== 'localhost') {
      window.location.replace(window.location.origin);
    }
  }

  private setUpStats() {
    tagManager(window, document, 'script', 'dataLayer', environment.googleTagManagerId);
    ga('create', environment.googleAnalyticsId, 'auto');
  }
}
