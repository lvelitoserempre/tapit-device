import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {IframeMessagingService} from './shared/services/iframe-messaging.service';
import {environment} from '../environments/environment';
import {TranslateService} from '@ngx-translate/core';
import {I18nService} from './shared/services/i18n.service';
import {SSOConfigService} from './single-sign-on/sso-config.service';
import {LoaderService} from './loader/loader-service/loader.service';
import {auth, initializeApp, remoteConfig} from 'firebase/app';
import 'firebase/remote-config';
import {ActivatedRoute} from '@angular/router';
import {CookiesService} from '../../../library/cookies.service';

declare var setupGTM;
declare var ga;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private iframeMessagingService: IframeMessagingService,
              private i18n: I18nService, private translate: TranslateService, private configService: SSOConfigService,
              private loaderService: LoaderService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    initializeApp(environment.firebase.config);
    remoteConfig().defaultConfig = {
      'sso_show_sign_up_with_fields': 'never'
    };
    remoteConfig().fetchAndActivate().then(activated => { 
      // @ts-ignore
      this.configService.setConfig({});
    });

    this.iframeMessagingService.listenWindowMessages();

    this.configService.getConfig().subscribe(config => {
      this.addCustomStyles(config.styles);
      const language = config.language ? config.language : this.i18n.getCurrentLanguage();
      this.translate.setDefaultLang(language);
    });


    this.route.queryParams.subscribe(queryParams => {
      if (queryParams.backUrl) {
        auth().onAuthStateChanged((user: firebase.User) => {
          if (user) {
            user.getIdToken().then(idToken => {
              CookiesService.setObject('loggedUser', {idToken, firstName: user.displayName, lastName: ''});
              window.location.replace(queryParams.backUrl);
            });
          }
        });
      } else {
        this.authService.getCurrentUser().subscribe(user => {
          this.iframeMessagingService.sendDataToParent('set-logged-user', user);
        })
      }
    });

    ga('create', environment.googleAnalyticsId, 'auto');
    setupGTM(window, document, 'script', 'dataLayer', environment.gtmId);
  }

  private addCustomStyles(styles: string) {
    if (styles) {
      const styleElement = document.createElement('style');
      styleElement.id = 'config-styles';
      styleElement.innerText = styles;
      document.body.appendChild(styleElement);
    }
  }
}
