import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {UserAccountService} from '../services/user-account/user-account.service';
import {Router} from '@angular/router';
import {LoaderService} from '../services/loader/loader.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  userAccount = '';

  constructor(private authService: AuthService, private userAccountService: UserAccountService, private router: Router,
              private loaderService: LoaderService, private auth: AngularFireAuth) {
    this.authService.listenUserStateChanges();
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
