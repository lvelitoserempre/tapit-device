import {Component, OnInit} from '@angular/core';
import {UserService} from './user/user.service';
import {Router} from '@angular/router';

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
  }

  /**
   * This method redirects the user to the root in production if the user has not entered his birth date
   */
  private redirectIfUserIsAChild() {
    if (!window.localStorage.getItem('anonymousUserBirthDate') && window.location.host !== 'localhost') {
      window.location.replace(window.location.origin);
    }
  }
}
