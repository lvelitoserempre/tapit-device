import {Component, Inject, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { ScriptService } from './services/script.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isOnWebView = false;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private scriptService: ScriptService
  ) {
    this.scriptService.loadScript('ssoApp')
    .then(function() {
      // @ts-ignore
      window.configTapitSso = () => {
      };
    })
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
    }
  }
}
