import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-profile',
  templateUrl: './info-profile.component.html',
  styleUrls: ['./info-profile.component.scss']
})
export class InfoProfileComponent implements OnInit {

  // SLIDER
  slideConfig = {
    slidesToShow: 1.1,
    slidesToScroll: 1,
    dots: false,
    infinite: false,
    autoplay: false,
    arrows: false,
  };

  constructor() { }

  ngOnInit(): void {
  }

}
