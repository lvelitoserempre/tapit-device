import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SSOConfigService} from '../single-sign-on/sso-config.service';
import SSOConfig from '../single-sign-on/sso-config';
import {IframeMessagingService} from '../shared/services/iframe-messaging.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  @Input()
  isShowingBackButton: boolean;
  @Input()
  isShowingLogo = true;
  @Input()
  isShowingSlogan = true;
  @Input()
  isShowingTabs = true;
  @Input()
  selectedTab: string;
  config: SSOConfig;


  constructor(private router: Router,
              private location: Location,
              private configService: SSOConfigService,
              private iframeMessagingService: IframeMessagingService) {
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
    this.location.back();
  }
}
