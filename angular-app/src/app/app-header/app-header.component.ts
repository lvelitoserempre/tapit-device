import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {AuthService} from '../services/auth/auth.service';
import {UserAccountService} from '../services/user-account/user-account.service';
import {Router} from '@angular/router';
import {LoaderService} from '../services/loader/loader.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  userAccount = '';
  userInitials: Subject<string>;

  constructor(
    private authService: AuthService,
    private userAccountService: UserAccountService,
    private router: Router,
    private loaderService: LoaderService
  ) {
    this.authService.listenUserStateChanges();
    this.userAccountService.listenUserAccountChanges();
    this.userInitials = this.userAccountService.userInitials;
  }

  ngOnInit(): void {
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.loaderService.show();
    this.authService.logout()
      .then(() => {
        this.loaderService.hide();
        localStorage.clear();
      })
      .catch((error) => {
        this.loaderService.hide();
      });
  }

  getName() {
    const data = JSON.parse(localStorage.getItem('userAccount'));
    let fullName = '';
    if (data !== null) {
      fullName = data.firstName + ' ' + data.lastName;
    }
    return fullName;
  }
}
