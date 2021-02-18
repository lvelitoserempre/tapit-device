import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isOnWebView = false;

  constructor(private route: ActivatedRoute,
              private angularFireAuth: AngularFireAuth) {
  }

  ngOnInit(): void {
    const search = new URLSearchParams(window.location.search);

    if (search.get('customToken')) {
      this.angularFireAuth.signInWithCustomToken(search.get('customToken'))
        .then(user => {
          console.log(user);
        });
    }

    if (search.get('source')) {
      this.isOnWebView = true;
    } else {
      this.injectSsoApp();

      // @ts-ignore
      window.configTapitSso = () => {
      };
    }

  }

  injectSsoApp(): void {
    if (!document.getElementById('sso-script')) {
      const scriptElement = document.createElement('script');
      scriptElement.setAttribute('src', environment.ssoApp);
      scriptElement.setAttribute('id', 'sso-script');
      document.body.insertAdjacentElement('beforeend', scriptElement);
    }
  }
}
