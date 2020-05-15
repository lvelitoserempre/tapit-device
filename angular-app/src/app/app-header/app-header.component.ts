import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {LoaderService} from '../loader/loader-service/loader.service';
import {UserAccount} from '../models/user-account.model';
import {UserAuthenticationService} from '../user-authentication/user-authentication-service/user-authentication.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  user: UserAccount;
  private userSubscription: Subscription;

  constructor(private loaderService: LoaderService, private userService: UserAuthenticationService, private router: Router,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.userSubscription = this.userService.getCurrentUser()
      .subscribe(user => {
        this.user = user;
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  logout() {
    this.loaderService.show();
    this.userService.logout()
      .subscribe(() => {
        this.loaderService.hide();
        this.router.navigateByUrl('auth/login');
      }, (error) => {
        console.error(error);
        this.loaderService.hide();
      });
  }

}
