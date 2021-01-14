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

  constructor(
    private route: ActivatedRoute,
    private angularFireAuth: AngularFireAuth
  ) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.customToken) {
        this.angularFireAuth.signInWithCustomToken(params.customToken);
      }
    });

    this.injectSsoApp();

    // @ts-ignore
    window.configTapitSso = () => {
    };
  }

  injectSsoApp(): void {
    const scriptElement = document.createElement('script');
    scriptElement.setAttribute('src', environment.ssoApp);
    document.body.insertAdjacentElement('beforeend', scriptElement);
  }
}
