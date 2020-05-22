import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {UserAccount} from '../models/user-account.model';
import {UserAuthenticationService} from '../user/user-authentication/user-authentication-service/user-authentication.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  user: UserAccount;
  private userSubscription: Subscription;

  constructor(private userAuthenticationService: UserAuthenticationService, private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.userSubscription = this.userAuthenticationService.getCurrentUser()
      .subscribe(user => {
        this.user = user;
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
