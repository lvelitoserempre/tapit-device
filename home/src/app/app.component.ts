import {Component, Inject, OnInit,ViewChild} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { ScriptService } from './services/script.service';
import {environment} from '../environments/environment';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AgeGateComponent } from './age-gate/age-gate.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CookieService } from "ngx-cookie-universal";
import {AuthService} from "./services/auth/auth.service"
import {DrupalService} from "./services/drupal.service"

declare var setupGTM: any;
declare var ga: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isOnWebView = false;
  private listenerRunning : boolean = false;

  @ViewChild('ageGate') private ageGate: AgeGateComponent;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private scriptService: ScriptService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngxService: NgxUiLoaderService,
    private cookies: CookieService,
    private _authService: AuthService,
    private drupalService: DrupalService
  ) {
    //this.ngxService.start();
    this.loadSSOScript();
    if (isPlatformBrowser(this.platformId)) {
      this.setUpStats()
    }
  }

  private loadSSOScript(): void {
    this.scriptService.loadScript('ssoApp')
    .then(function() {
      // @ts-ignore
      window.configTapitSso = () => {
      };
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

  ngOnInit(): void {
    const search = new URLSearchParams(window.location.search);

    if (search.get('customToken')) {
      this.angularFireAuth.signInWithCustomToken(search.get('customToken'))
      .then(user => {
        console.log(user);
      });
    }

    if (search.get('source')) {
      this.isOnWebView = true;
    }
  }

  ngAfterViewInit() {
    if (!this.isOnWebView) {
      this.readCookies();
    }
    if (!this.isOnWebView) {
      this.scriptService.loadScript('optanon')
      .then(function() {
        function OptanonWrapper() {}
      })
    }
    this.ngxService.stop();
  }

  ngAfterViewChecked() {
    if(window.ssoApp && !this.listenerRunning){
      this.drupalService.onLoginCompleate();
      this.listenerRunning = true;
      this.openSso();
    }
  }

  private setUpStats() {
    setupGTM(window, document, 'script', 'dataLayer', environment.googleTagManagerId);
    ga('create', environment.googleAnalyticsId, 'auto');
  }

  showVerifyIdentity(evt: boolean) {
    this._authService.getUser();
  }
  openSso(){
    const smsStepSSO = window.localStorage.getItem('sms-step');
    if (smsStepSSO && smsStepSSO !== 'phone-verified') {
      window.ssoApp.showApp(smsStepSSO);
    }
  }
}
