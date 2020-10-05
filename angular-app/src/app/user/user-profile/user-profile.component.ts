import {Component, OnInit} from '@angular/core';
import {UserAccount} from '../../models/user-account.model';
import {AuthService} from '../user-authentication/user-authentication-service/auth.service';
import {LoaderService} from '../../loader/loader-service/loader.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {Location} from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: UserAccount = {firstName: '', lastName: ''};
  shareUrl: string;
  shareMessage: string;
  shareRedirectUrl: string;
  sharePlainMessage: string;
  facebookAppId = environment.production ? '1703386173129451' : '656082591823070';

  constructor(private loaderService: LoaderService,
              private userAuthenticationService: AuthService,
              private router: Router,
              private location: Location,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.user = data.user;
      this.shareUrl = 'https://tapit.com.co/?utm_source=referredCode&utm_medium=referral';
      this.shareRedirectUrl = 'https://tapit.com.co/app/user/profile';
      this.shareMessage = 'Hola! Me estoy tomando una pola fría y me acorde de ti, entra a ' +
        encodeURIComponent(this.shareUrl) + ' descarga la app y no olvides ingresar mi código TapIt: ' + this.user.referralCode;
      this.sharePlainMessage = 'Hola! Me estoy tomando una pola fría y me acorde de ti, entra a tapit.com.co descarga la app y no olvides ingresar mi código TapIt: ' + this.user.referralCode;
    });
  }

  logout() {
    this.loaderService.show();
    this.userAuthenticationService.logout()
      .subscribe(() => {
        this.loaderService.hide();
        this.router.navigateByUrl('auth/login');
        //window.location.replace('/app/auth');
      }, (error) => {
        console.error(error);
        this.loaderService.hide();
      });
  }
}
