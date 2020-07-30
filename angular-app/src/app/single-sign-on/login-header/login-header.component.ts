import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ConfigService} from '../config.service';
import SSOConfig from '../sso-config';
import {IframeMessagingService} from '../iframe-messaging.service';

@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.scss']
})
export class LoginHeaderComponent implements OnInit {
  @Input()
  isShowingBackButton: any;
  @Input()
  selectedTab: string;
  config: SSOConfig;


  constructor(private router: Router, private configService: ConfigService, private iframeMessagingService: IframeMessagingService) {
  }

  ngOnInit(): void {
    this.configService.getConfig().subscribe(config => {
      this.config = config;
    })
  }

  closePopup() {
    this.iframeMessagingService.sendDataToParent('close-popup', {});
  }

  navigateBack() {
    this.router.navigateByUrl('/sso/login');
  }
}
