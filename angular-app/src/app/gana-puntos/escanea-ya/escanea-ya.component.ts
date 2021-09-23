import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-escanea-ya',
  templateUrl: './escanea-ya.component.html',
  styleUrls: ['./escanea-ya.component.scss']
})
export class EscaneaYaComponent implements OnInit {

  constructor() { }
  isMobile: boolean = false;
  isDesktop: boolean = false;

  detectMobileDevice() {
    if (window.navigator.userAgent.match(/Android/i)) {
      this.isMobile = true;
    } else if (window.navigator.userAgent.match(/iPhone/i) || window.navigator.userAgent.match(/iPad/i)) {
      this.isMobile = true;
    } else {
      this.isDesktop = true;
    }
  }

  ngOnInit(): void {
    this.detectMobileDevice();
  }

}
