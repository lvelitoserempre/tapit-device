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

  getUrl() {
    const message = 'Hola! Me estoy tomando una pola fría y me acorde de ti, entra a https%3A%2F%2Ftapit.com.co%2F%3Futm_source%3DreferredCode%26utm_medium%3Dreferral descarga la app y no olvides ingresar mi código TapIt: ' + this.user.referralCode;
    const href = 'https://tapit.com.co/app/auth/signup/' + this.user.referralCode;
    const redirectUri = 'https://tapit.com.co/app/user/profile';

    return 'https://www.facebook.com/dialog/share?app_id=656082591823070&display=popup' +
      '&title=' + message + '&description=' + message + '&quote=' + message + '&caption=' + message + '&href=' + href
      + '&redirect_uri=' + redirectUri;
  }
}
