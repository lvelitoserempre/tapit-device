import {Component, Inject, OnInit,ViewChild} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { ScriptService } from './services/script.service';
import {environment} from '../environments/environment';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AgeGateComponent } from './age-gate/age-gate.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CookieService } from "ngx-cookie-universal";
import { AuthService } from './services/auth/auth.service';
import { VerifyIdentityComponent } from './verify-identity/verify-identity.component';

declare var setupGTM: any;
declare var ga: any;
declare var fbq: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isOnWebView = false;
  @ViewChild('ageGate') private ageGate: AgeGateComponent;
  @ViewChild('verifyIdentity') private verifyIdentity: VerifyIdentityComponent;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private scriptService: ScriptService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngxService: NgxUiLoaderService,
    private cookies: CookieService,
    private _authService: AuthService
  ) {
    this.ngxService.start();
    this.loadSSOScript();
    if (isPlatformBrowser(this.platformId)) {
      this.setUpStats();
    }
  }

  ngOnInit(): void {
    const search = new URLSearchParams(window.location.search);
    if (search.get('customToken')) {
      this.angularFireAuth.signInWithCustomToken(search.get('customToken'))
      .then(user => {});
    }
    if (search.get('source')) {
      this.isOnWebView = true;
    }  
  }

  ngAfterViewInit() {
    if (!this.isOnWebView) {
      this.readCookies();
      this.scriptService.loadScript('optanon').then(() => {
        function OptanonWrapper() {};
      });
    }
    this.ngxService.stop();
  }

  private loadSSOScript(): void {
    this.scriptService.loadScript('ssoApp').then((res: any) => {
      // @ts-ignore
      window.configTapitSso = () => {};
    });
  }

  private readCookies(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.cookies.get('anonymousUserBirthDate')) {
        this.ageGate.openAgeGate();
      } else {
        this._authService.getUser();
      }
    }
  }

  private setUpStats() {
    setupGTM(window, document, 'script', 'dataLayer', environment.googleTagManagerId);
    ga('create', environment.googleAnalyticsId, 'auto');
    fbq('init', environment.facebookPixelId);
    fbq('track', 'PageView');
  }

  showVerifyIdentity(evt: boolean) {    
    this._authService.getUser();
  }
}
