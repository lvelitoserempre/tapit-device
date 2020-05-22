import { Component, ElementRef, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-twitter-button',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.scss']
})
export class TwitterComponent implements AfterViewInit {

  @Input() 
  url: string;
  @Input() 
  text: string;
  @Input() 
  label: string;

    constructor() { }

    ngAfterViewInit(): void { }

}
