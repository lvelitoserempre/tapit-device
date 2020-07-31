import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../user/user-authentication/user-authentication-service/auth.service';
import {IframeMessagingService} from '../iframe-messaging.service';
import {initializeApp} from 'firebase';
import {environment} from '../../../environments/environment';
import {TranslateService} from '@ngx-translate/core';
import {I18nService} from '../i18n.service';
import {ConfigService} from '../config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private iframeMessagingService: IframeMessagingService,
              private i18n: I18nService, private translate: TranslateService, private configService: ConfigService) {
    this.translate.setDefaultLang(this.i18n.getCurrentLanguage());
  }

  ngOnInit(): void {
    initializeApp(environment.firebase.config);
    this.authService.setupLoggedUserObserver();
    this.iframeMessagingService.init();

    this.authService.getCurrentUser()
      .subscribe(user => {
        this.iframeMessagingService.sendDataToParent('set-logged-user', user);
      })

    this.configService.getConfig().subscribe(config => this.addCustomStyles(config.styles));
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
