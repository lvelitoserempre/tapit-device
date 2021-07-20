import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit, AfterViewInit {

  constructor(private elementRef:ElementRef) { }

  public triggers;
  public contents;

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.triggers = this.elementRef.nativeElement.querySelectorAll('.tab-triggers');
    this.contents = this.elementRef.nativeElement.querySelectorAll('.tab-content');
    for(let i = 0; i < this.triggers.length; i++) {
      this.triggers[i].addEventListener('click', this.changeTab.bind(this));
    }
  }

  changeTab(event: { target: HTMLSpanElement; }): void {
    const targetElement = event.target;
    let triggerIndex = 0;
    for(let i = 0; i < this.triggers.length; i++) {
      if(targetElement == this.triggers[i]) {
        triggerIndex = i;
      }
      this.triggers[i].classList.remove('active');
      this.contents[i].classList.add('hidden');
    }
    targetElement.classList.add('active');
    this.contents[triggerIndex].classList.remove('hidden');
  }

}
