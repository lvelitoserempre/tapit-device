import {Component, OnDestroy, OnInit} from '@angular/core';
import {of, Subscription} from 'rxjs';
import {environment} from '../../environments/environment';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {UserAccount} from '../user/user-account';
import firebase from 'firebase/app';
import 'firebase/remote-config';
import remoteConfig = firebase.remoteConfig;
import {AngularFireRemoteConfig} from '@angular/fire/remote-config';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: UserAccount;
  marketUrl = environment.production ? 'https://market.tapit.com.co' : 'https://market-dev.tapit.com.co';
  showLoginButton = false;
  showMicrogifting = true;

  constructor(
    private afs:AngularFireRemoteConfig,
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private route: ActivatedRoute, private router: Router
  ) { }

  setMenu(event: any) {
    if (event.target.checked) {
      //document.body.classList.add('overflow-hidden');
    } else {
      //document.body.classList.remove('overflow-hidden');
    }
  }

  loginCloseMenu() {
    //document.getElementById('toggleMenu').click()
  }

  ngOnInit(): void {
    this.angularFireAuth.user
    .pipe(switchMap(user => {
      return user ? this.angularFirestore.collection('user_account_tap').doc(user.uid).valueChanges() : of(null);
    }))
    .subscribe(user => {
      this.user = user;
    })
  }

  ngOnDestroy(): void {
    //this.userSubscription.unsubscribe();
  }
}
