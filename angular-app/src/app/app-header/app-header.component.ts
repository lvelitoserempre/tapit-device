import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {LoaderService} from '../services/loader/loader.service';
import {UserAccount} from '../models/user-account.model';
import {AuthService} from '../user/auth.service';
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

  constructor(private loaderService: LoaderService, private userService: AuthService, private router: Router,
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
        this.router.navigateByUrl('login');
      }, (error) => {
        console.error(error);
        this.loaderService.hide();
      });
  }

}
