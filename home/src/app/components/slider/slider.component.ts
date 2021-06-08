import {Component, Input} from '@angular/core';

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
}
