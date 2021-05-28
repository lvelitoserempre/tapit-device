import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-user-text',
  templateUrl: './userText.component.html',
  styleUrls: ['./userText.component.scss']
})

export class userText {
  @Input()
  html: any;
  @Input()
  show: any;
}
