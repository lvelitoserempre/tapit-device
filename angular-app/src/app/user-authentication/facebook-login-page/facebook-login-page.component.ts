import {Component, OnInit} from '@angular/core';
import {auth} from 'firebase';
import FacebookAuthProvider = auth.FacebookAuthProvider;

@Component({
  selector: 'app-facebook-login-page',
  templateUrl: './facebook-login-page.component.html',
  styleUrls: ['./facebook-login-page.component.scss']
})
export class FacebookLoginPageComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  login() {
    const facebookAuthProvider = new FacebookAuthProvider();

    auth().signInWithPopup(facebookAuthProvider).then(res => {
      console.log(res);
    });
  }
}
