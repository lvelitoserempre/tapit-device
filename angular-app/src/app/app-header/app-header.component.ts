import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserAccount} from '../user/user-account.model';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';
import {environment} from '../../environments/environment';
import {NavigationEnd, Router} from '@angular/router';
import {take} from 'rxjs/operators';
import firebase from 'firebase/app';
import 'firebase/remote-config';
import remoteConfig = firebase.remoteConfig;
import { DataRepoService } from '../services/data-repo.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  user: UserAccount;
  marketUrl = environment.marketUrl;
  showLoginButton = false;
  private userSubscription: Subscription;
  showCuponeraButton$: false;
  showMicrogifting$ = false;

  constructor(
    private userAuthenticationService: AuthService,
    private router: Router,
    private dataRepoService: DataRepoService
  ) {
    this.dataRepoService.getShowWallet().subscribe((data:  any) => {
      this.showCuponeraButton$ = data.data;
    });
    this.dataRepoService.getShowMicrogifting().subscribe((data:  any) => {
      this.showMicrogifting$ = data.data;
    });
  }

  setMenu(event: any) {
    if (event.target.checked) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }

  loginCloseMenu() {
    document.getElementById('toggleMenu').click()
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.userAuthenticationService.getCurrentUser().pipe(take(1))
        .subscribe(user => {
          this.showLoginButton = !user && event.url !== '/auth/login';
        })
      }
    })

    this.userSubscription = this.userAuthenticationService.getCurrentUser()
    .subscribe(user => {
      this.user = user;
      this.showLoginButton = !user
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
