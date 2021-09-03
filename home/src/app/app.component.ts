import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ScriptService } from './services/script.service';
import { environment } from '../environments/environment';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AgeGateComponent } from './age-gate/age-gate.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CookieService } from 'ngx-cookie-universal';
import { AuthService } from './services/auth/auth.service';
import { DrupalService } from './services/drupal.service';
import { ActivatedRoute } from '@angular/router';

declare var setupGTM: any;
declare var ga: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isOnWebView = false;
  @ViewChild('ageGate') private ageGate: AgeGateComponent;

  constructor(
    private scriptService: ScriptService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngxService: NgxUiLoaderService,
    private cookies: CookieService,
    private _authService: AuthService,
    private drupalService: DrupalService,
    private route: ActivatedRoute
  ) {
    this.ngxService.start();
    this.loadSSOScript();
    if (isPlatformBrowser(this.platformId)) {
      this.setUpStats();
    }
  }

  private loadSSOScript(): void {
    this.scriptService.loadScript('ssoApp')
    .then( () => {
      // @ts-ignore
      window.configTapitSso = () => {
        ssoApp.onFlowCompleted().subscribe((response: any) => {
          const firestoreUser = response.userCredential.user;
          this._authService.setCurrentSessionData(firestoreUser);
          this.openSso();
          this.drupalService.checkDrupalCTA();
        })
      };
    });
  }

  private readCookies(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.cookies.get('anonymousUserBirthDate')) {
        this.ageGate.openAgeGate();
      } else {
        //this._authService.getUser();
      }
    }
  }

  async ngOnInit(): Promise<void> {
    const search = new URLSearchParams(window.location.search);
    const source = search.get('source');
    if (source) {
      this.isOnWebView = true;
      if (source == 'android') {
        // @ts-ignore
        var customToken = await window.Android.getCustomToken();
        this._authService.loginUserByCustomToken (customToken);
      }
      if (source == 'ios') {
        if ((window as any).webkit && (window as any).webkit.messageHandlers) {
          (window as any).webkit.messageHandlers.getCustomToken.postMessage({});
        }
      }
    } else {
      this.redirect();
    }
  }

  ngAfterViewInit() {
    if (!this.isOnWebView) {
      this.readCookies();
    }
    if (!this.isOnWebView) {
      this.scriptService.loadScript('optanon')
      .then(function () {
        function OptanonWrapper() {}
      }, error => console.error(error));
    }
    this.ngxService.stopAll();
  }

  private setUpStats() {
    setupGTM(
      window,
      document,
      'script',
      'dataLayer',
      environment.googleTagManagerId
    );
    ga('create', environment.googleAnalyticsId, 'auto');
  }

  showVerifyIdentity(evt: boolean) {
    //this._authService.getUser();
  }

  openSso() {
    const smsStepSSO = window.localStorage.getItem('sms-step');
    if (smsStepSSO && smsStepSSO !== 'phone-verified') {
      window.ssoApp.showApp(smsStepSSO);
    }
  }

  //funtion that redirects in case we receive the redirection query param "rl"
  private redirect(): void {
    this.route.queryParams.subscribe({
      next: (params) => {
        if (params.rl) {
          window.location.href = `https://www.${params.rl}`;
        }
      },
    });
  }
}
