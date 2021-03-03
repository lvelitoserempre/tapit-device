import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  isAndroid= false;
  isIOs = false;

  constructor() {
  }
  /*detectIos() {
    const toMatch = [
      /iPhone/i,
      /iPod/i
    ];
    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  }
  detectAndroid() {
    const toMatch = [
      /Android/i
    ];
    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  }*/

  ngOnInit() {
    /*this.isAndroid = this.detectAndroid();
    this.isIOs = this.detectIos();*/
  }

}
