import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {UserAccountService} from '../services/user-account/user-account.service';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss']
})
export class AppFooterComponent implements OnInit {

  constructor(private authService: AuthService, private userAccountService: UserAccountService,) {
  }

  ngOnInit() {
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  gotoMap($event) {
    document.querySelector($event.target.getAttribute('data-scroll')).scrollIntoView({
      behavior: 'smooth'
    });
  }
}
