import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-beer-carrousel',
  templateUrl: './beerCarrousel.component.html',
  styleUrls: ['./beerCarrousel.component.scss']
})

export class BeerCarrouselComponent {
  @Input()
  title: string;
  @Input()
  description: string;
  @Input()
  slides: any;
  @Input()
  config: any;
  @Input()
  link: any;
  @Input()
  variant: string;
  @Input()
  scrollToSection: any;

}
