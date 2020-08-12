import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {IframeMessagingService} from './shared/services/iframe-messaging.service';
import {environment} from '../environments/environment';
import {TranslateService} from '@ngx-translate/core';
import {I18nService} from './shared/services/i18n.service';
import {SSOConfigService} from './single-sign-on/sso-config.service';
import {LoaderService} from './loader/loader-service/loader.service';
import {initializeApp} from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private iframeMessagingService: IframeMessagingService,
              private i18n: I18nService, private translate: TranslateService, private configService: SSOConfigService,
              private loaderService: LoaderService) {
  }

  ngOnInit(): void {
    this.loaderService.show();
    initializeApp(environment.firebase.config);
    this.authService.setupLoggedUserObserver();
    this.iframeMessagingService.init();

    this.authService.getCurrentUser()
      .subscribe(user => {
        this.iframeMessagingService.sendDataToParent('set-logged-user', user);
        this.loaderService.hide()
      })

    this.configService.getConfig().subscribe(config => {
      this.addCustomStyles(config.styles);
      const language = config.language ? config.language : this.i18n.getCurrentLanguage();
      this.translate.setDefaultLang(language);
    });
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
