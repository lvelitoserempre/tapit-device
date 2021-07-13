import {Component, Input} from '@angular/core';
import {DrupalService} from '../../services/drupal.service';
import { CookiesService } from '../../services/cookies.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})

export class SliderComponent {
  @Input()
  slides: any;
  @Input()
  scrollToSection: any;
  @Input()
  config: any;

  constructor(
    private drupalService: DrupalService
  ) {
  }
  public callToAction(slide:any): void{
    if((slide.permissions.logged && this.drupalService.getSession()) || slide.permissions.anonymous) {
      this.scrollToSection(slide.link.uri, slide.link.target);
    }else{
      CookiesService.setValue('LOGIN_REDIRECTION', slide.link.uri);
      ssoApp.showApp();
    }
  }
}
