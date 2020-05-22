import { Component, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-facebook-button',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.scss']
})
export class FacebookComponent implements AfterViewInit {

  @Input() 
  url: string;

  @Input() 
  label: string;
  
  constructor() { }
  
  ngAfterViewInit(): void { }

}
