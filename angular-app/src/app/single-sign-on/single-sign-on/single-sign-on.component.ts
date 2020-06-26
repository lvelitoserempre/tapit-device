import {Component, OnInit} from '@angular/core';
import {initializeApp} from 'firebase';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './single-sign-on.component.html',
  styleUrls: ['./single-sign-on.component.scss']
})
export class SingleSignOnComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    initializeApp(environment.firebase.config);
  }

}
