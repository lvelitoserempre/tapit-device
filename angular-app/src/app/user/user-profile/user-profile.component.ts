import {Component, OnInit} from '@angular/core';
import {UserAccount} from '../../models/user-account.model';
import {UserAuthenticationService} from '../user-authentication/user-authentication-service/user-authentication.service';
import {LoaderService} from '../../loader/loader-service/loader.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: UserAccount = {};

  constructor(private loaderService: LoaderService, private userAuthenticationService: UserAuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userAuthenticationService.getCurrentUser().subscribe(user => this.user = user);
  }

  logout() {
    this.loaderService.show();
    this.userAuthenticationService.logout()
      .subscribe(() => {
        this.loaderService.hide();
        this.router.navigateByUrl('auth/login');
      }, (error) => {
        console.error(error);
        this.loaderService.hide();
      });
  }

}
