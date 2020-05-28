import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserAccount} from '../models/user-account.model';
import {UserAuthenticationService} from '../user/user-authentication/user-authentication-service/user-authentication.service';
import {Subscription} from 'rxjs';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  user: UserAccount;
  marketUrl = environment.production ? 'https://market.tapit.com.co' : 'https://market-dev.tapit.com.co';
  private userSubscription: Subscription;

  constructor(private userAuthenticationService: UserAuthenticationService) {
  }

  ngOnInit(): void {
    this.userSubscription = this.userAuthenticationService.getCurrentUser()
      .subscribe(user => {
        this.user = user;
      });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
