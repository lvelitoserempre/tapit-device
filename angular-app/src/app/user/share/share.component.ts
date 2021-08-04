import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserAccount} from '../user-account.model';
import {environment} from '../../../environments/environment';
import {Subscription} from 'rxjs';
import {ProfileService} from '../profile/profile.service';
import { Router } from '@angular/router';
import { LoggedUserService } from 'src/app/services/logged-user.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit, OnDestroy {
  @ViewChild('section', {static: true})
  section: ElementRef;
  user: UserAccount = {firstName: '', lastName: ''};
  shareUrl: string;
  shareMessage: string;
  shareRedirectUrl: string;
  sharePlainMessage: string;
  facebookAppId = environment.production ? '1703386173129451' : '656082591823070';
  private subscription: Subscription;

  constructor(
    private loggedUser: LoggedUserService,
    private router: Router,
    private ps: ProfileService
  ) { }

  ngOnInit(): void {
    this.loggedUser.getUser();
    this.subscription = this.loggedUser.subscribe(user => {
      this.user = user;
      this.shareUrl = 'https://tapit.com.co/?utm_source=referredCode&utm_medium=referral';
      this.shareRedirectUrl = 'https://tapit.com.co/app/user/profile';
      this.shareMessage = 'Hola! Me estoy tomando una pola fría y me acorde de ti, entra a ' +
        encodeURIComponent(this.shareUrl) + ' descarga la app y no olvides ingresar mi código TapIt: ' + this.user.referralCode;
      this.sharePlainMessage = 'Hola! Me estoy tomando una pola fría y me acorde de ti, entra a tapit.com.co descarga la app y no olvides ingresar mi código TapIt: ' + this.user.referralCode;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goBack() {
    if (window.screen.width < 768) {
      this.section.nativeElement.style = 'transform: translateX(600px)'

      setTimeout(() => {
        this.router.navigateByUrl('/user/profile');
        this.ps.next(true);
      }, 300);
    }
  }
}
