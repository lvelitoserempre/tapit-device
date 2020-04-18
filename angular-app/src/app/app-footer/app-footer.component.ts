import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {AuthService} from '../services/auth/auth.service';
import {UserAccountService} from '../services/user-account/user-account.service';
import {Router} from '@angular/router';
import {LoaderService} from '../services/loader/loader.service';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss']
})
export class AppFooterComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userAccountService: UserAccountService,
  ) {
    this.authService.listenUserStateChanges();
    this.userAccountService.listenUserAccountChanges();
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
