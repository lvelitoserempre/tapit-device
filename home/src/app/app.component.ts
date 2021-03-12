import {Component, Inject, OnInit,ViewChild} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { ScriptService } from './services/script.service';
import {CookiesService} from './services/cookies.service';

import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AgeGateComponent } from './age-gate/age-gate.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isOnWebView = false;
  @ViewChild('ageGate') private ageGate: AgeGateComponent;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private scriptService: ScriptService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loadSSOScript();
  }

  private loadSSOScript(): void {
    this.scriptService.loadScript('ssoApp')
    .then(function() {
      // @ts-ignore
      window.configTapitSso = () => {
      };
    })
  }

  private readCookies(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (!CookiesService.getValue('anonymousUserBirthDate')) {
        this.ageGate.openAgeGate();
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
    this.readCookies();
  }
}
