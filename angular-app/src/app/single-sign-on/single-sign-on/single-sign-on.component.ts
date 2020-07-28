import {Component, OnInit} from '@angular/core';
import {initializeApp} from 'firebase';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../user/user-authentication/user-authentication-service/auth.service';
import {IframeCommunicatorService} from '../iframe-communicator.service';
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from '../i18n.service';

@Component({
  selector: 'app-root',
  templateUrl: './single-sign-on.component.html',
  styleUrls: ['./single-sign-on.component.scss']
})
export class SingleSignOnComponent implements OnInit {

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
  }
}
