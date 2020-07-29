import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../user/user-authentication/user-authentication-service/auth.service';
import {IframeCommunicatorService} from '../iframe-communicator.service';
import {initializeApp} from 'firebase';
import {environment} from '../../../environments/environment';
import {TranslateService} from '@ngx-translate/core';
import {I18nService} from '../i18n.service';

declare var zE;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private iframeCommunicatorService: IframeCommunicatorService,
              private i18n: I18nService, private translate: TranslateService) {
    this.translate.setDefaultLang(this.i18n.getCurrentLanguage());
  }

  ngOnInit(): void {
    initializeApp(environment.firebase.config);
    this.authService.setupLoggedUserObserver();
    this.iframeCommunicatorService.init();

    this.authService.getCurrentUser()
      .subscribe(user => {
        this.iframeCommunicatorService.sendDataToParent('setLoggedUser', user);
      })

    if (typeof zE === 'function') {
      zE('webWidget', 'hide');
    }
  }
}
