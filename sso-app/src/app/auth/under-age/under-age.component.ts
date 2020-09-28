import {Component, OnInit} from '@angular/core';
import {SSOConfigService} from '../../single-sign-on/sso-config.service';
import SSOConfig from '../../single-sign-on/sso-config';

@Component({
  selector: 'app-under-age',
  templateUrl: './under-age.component.html',
  styleUrls: ['./under-age.component.scss']
})
export class UnderAgeComponent implements OnInit {

  config: SSOConfig;

  constructor(private configService: SSOConfigService,) {
  }

  ngOnInit(): void {
    this.configService.getConfig().subscribe(config => {
      this.config = config;
    });
  }

}
