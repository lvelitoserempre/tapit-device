import {Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserAccount} from '../user-account.model';
import {LoggedUserService} from '../../logged-user.service';
import {LoadingService} from '../../loading.service';
import {from, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileService} from './profile.service';
import firebase from 'firebase/app';
import 'firebase/auth';
import auth = firebase.auth;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  @ViewChild('navbar', {static: true})
  navbar: ElementRef;
  user: UserAccount = {firstName: '', lastName: ''};
  showNavbar = true;
  private subscription: Subscription;

  constructor(
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private ps: ProfileService,
    private loggedUser: LoggedUserService
  ) { }

  ngOnInit(): void {
    if (window.screen.width < 768) {
      if (this.route.children.length > 0) {
        this.navbar.nativeElement.classList.add('hidden');
      }
    }
    this.goTo('/user/profile/share');
    this.ps.subscribe(show => {
      if (window.screen.width < 768) {
        this.navbar.nativeElement.classList.remove('hidden');
        this.navbar.nativeElement.style = '';
      }
    });

    this.subscription = this.loggedUser.subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    this.loadingService.show();
    from(auth().signOut())
      .subscribe(() => {
        this.loadingService.hide();

        if (window.origin !== 'http://localhost:4200') {
          window.location.replace('/');
        }
      }, (error) => {
        console.error(error);
        this.loadingService.hide();
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goTo(route: string) {
    if (window.screen.width < 768) {
      this.navbar.nativeElement.style = 'transform: translateX(-600px)'
      setTimeout(() => {
        this.router.navigateByUrl(route);
        this.navbar.nativeElement.classList.add('hidden');
      }, 300);
    } else {
      this.router.navigateByUrl(route);
    }
  }
}
