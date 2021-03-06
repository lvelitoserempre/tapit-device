import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
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
import { VerifyIdentityComponent } from './verify-identity/verify-identity.component';
import { RemoteConfigService } from './services/remote-config.service';
import { ReferralModalComponent } from './referral-modal/referral-modal.component'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

declare var setupGTM: any;
declare var ga: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  isOnWebView = false;
  @ViewChild('ageGate') private ageGate: AgeGateComponent;
  @ViewChild('verifyIdentity') private verifyIdentity: VerifyIdentityComponent;
  public haveReferral: boolean = false;
  public SS0: any;

  constructor(
    private scriptService: ScriptService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngxService: NgxUiLoaderService,
    private cookies: CookieService,
    private _authService: AuthService,
    private drupalService: DrupalService,
    private route: ActivatedRoute,
    private remoteConfigService: RemoteConfigService,
    private http: HttpClient
  ) {
    this.ngxService.start();
    if (isPlatformBrowser(this.platformId)) {
      this.loadSSOScript();
      this.setUpStats();
    }
  }

  private getReferral(token: string): Observable<any>  {
    return this.http.get(`${environment.firebase.functions.url}${environment.referral}`, { headers: { authorization: `Bearer ${ token }`}})
  }

  private loadSSOScript(): void {
    this.scriptService.loadScript('ssoApp')
    .then( () => {
      // @ts-ignore
      window.configTapitSso = () => {
        this.openSso();
        ssoApp.onFlowCompleted().subscribe((response: any) => {
          const firestoreUser = response.userCredential.user;
          this._authService.setCurrentSessionData(firestoreUser)
          .then(()=> {
            this.drupalService.checkDrupalCTA();
            this.verifyIdentity.openVerifyIdentity(firestoreUser.uid);
          }).catch(error => console.error(error));
        })
      };
    }).catch(error => console.error(error));
  }

  private readCookies(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.cookies.get('anonymousUserBirthDate')) {
        this.ageGate.openAgeGate();
      }
      if (this.cookies.get('__session')) {
        try {
          const userData = JSON.parse(this.cookies.get('loggedUser'))
          this.verifyIdentity.openVerifyIdentity(userData.id)
        } catch (e) {
          this.ngxService.stopAll();
        }
      }
    }
  }

  async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      this.remoteConfigService.getValues();
    }
    const search = new URLSearchParams(window.location.search);
    const source = search.get('source');
    if (source) {
      this.isOnWebView = true;
    } else {
      this.redirect();
    }
  }

  ngAfterViewInit() {
    if (!this.isOnWebView) {
      this.readCookies();
      this.scriptService.loadScript('optanon')
      .then(() => {
      }, error => console.error(error));
    }
    this.ngxService.stopAll();
    this.getReferral(this.cookies.get('frbtkn')).subscribe(res => {
      if(res.data.referralCodeShow) {
        this.haveReferral = true;
      };
    });
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

  public closeModal(): void {
    this.haveReferral = false;
  }
}
