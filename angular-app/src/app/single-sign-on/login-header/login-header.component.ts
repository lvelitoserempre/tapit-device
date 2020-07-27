import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

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


  constructor(private router:Router, public translate: TranslateService) {
    const userLanguage = navigator.language ? navigator.language.slice(0,2) : 'es';
    this.translate.setDefaultLang(userLanguage);
  }

  ngOnInit(): void {
  }

  closePopup() {
  }

  navigateBack() {
    this.router.navigateByUrl('/sso/login');
  }
}
