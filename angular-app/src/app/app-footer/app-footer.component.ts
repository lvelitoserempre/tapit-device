import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss']
})
export class AppFooterComponent implements OnInit {
  isAndroid: boolean;
  isIOs: boolean;

  constructor() {
  }
  detectIos() {
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
  }

  ngOnInit() {
    this.isAndroid = this.detectAndroid();
    this.isIOs = this.detectIos();
  }

}
