import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SSOConfigService} from '../single-sign-on/sso-config.service';
import SSOConfig from '../single-sign-on/sso-config';
import {IframeMessagingService} from '../shared/services/iframe-messaging.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  @Input()
  isShowingBackButton: any;
  @Input()
  selectedTab: string;
  config: SSOConfig;


  constructor(private router: Router, private configService: SSOConfigService, private iframeMessagingService: IframeMessagingService) {
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
