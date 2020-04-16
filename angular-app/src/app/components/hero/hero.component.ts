import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})

export class AppHeroComponent implements OnInit {

  mobile: boolean

  constructor() { 
    
  }

  ngOnInit() {
  }

  gotoSteps($event) {
    document.querySelector($event.target.getAttribute('data-scroll')).scrollIntoView({
        behavior: 'smooth'
    });
  }

}
