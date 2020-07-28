import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../user/user-authentication/user-authentication-service/auth.service';
import {IframeCommunicatorService} from '../iframe-communicator.service';
<<<<<<< HEAD:angular-app/src/app/single-sign-on/app/app.component.ts
import {initializeApp} from 'firebase';
import {environment} from '../../../environments/environment';

declare var zE;
=======
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from '../i18n.service';
>>>>>>> 35bb49e3c7f2110a59e6cb3b804fb48eda182b3e:angular-app/src/app/single-sign-on/single-sign-on/single-sign-on.component.ts

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private iframeCommunicatorService: IframeCommunicatorService,
    private i18n: I18nService, public translate: TranslateService) {
    this.translate.setDefaultLang(this.i18n.getCurrentLanguage());
  }

  ngOnInit(): void {
    initializeApp(environment.firebase.config);
    this.authService.setupLoggedUserObserver();

    this.authService.getCurrentUser()
      .subscribe(user => {
        this.iframeCommunicatorService.sendDataToParent('setLoggedUser', user);
      })

    if (typeof zE === 'function') {
      zE('webWidget', 'hide');
    }
  }
}
