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

  constructor() {
  }

  detectMobileDevice(){
    if(navigator.userAgent.match(/Android/i)){
      this.isAndroid = true;
    } else if(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
      this.isIOs = true;
    }
  }
  

  ngOnInit() {
    this.detectMobileDevice();
  }

}
