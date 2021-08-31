import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  isAndroid= false;
  isIOs = false;
  isOnWebView: boolean = false;
  currentYear: number;

  constructor() {
  }

  detectMobileDevice(){
    if(window.navigator.userAgent.match(/Android/i)){
      this.isAndroid = true;
    } else if(window.navigator.userAgent.match(/iPhone/i) || window.navigator.userAgent.match(/iPad/i)) {
      this.isIOs = true;
    }
  }

  getCurrentYear(){
    const date = new Date();
    this.currentYear = date.getFullYear(); 
  }

  ngOnInit() {
    this.detectMobileDevice();
    this.getCurrentYear();
  }

}
