import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from '../i18n.service';

@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.scss']
})
export class LoginHeaderComponent implements OnInit {
  @Input()
  isShowingBackButton: any;
  @Input()
  title: any;


  constructor(private router:Router, private i18n: I18nService, public translate: TranslateService) {
    this.translate.setDefaultLang(this.i18n.getCurrentLanguage());
  }

  ngOnInit(): void {
  }

  closePopup() {
  }

  navigateBack() {
    this.router.navigateByUrl('/sso/login');
  }
}
