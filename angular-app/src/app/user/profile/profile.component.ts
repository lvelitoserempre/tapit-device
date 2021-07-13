import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {UserAccount} from '../user-account.model';
import {LoggedUserService} from '../../logged-user.service';
import {LoadingService} from '../../loading.service';
import { from, Subscription, Observable, fromEvent } from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import { ProfileService } from './profile.service';
import auth = firebase.auth;
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: UserAccount = {firstName: '', lastName: ''};
  private subscription: Subscription;

  showProfile: boolean = true;

  // Resize
  resizeObservable$: Observable<Event>
  resizeSubscription$: Subscription;
  isMobile: boolean;
  public showNavbar: boolean = true;

  constructor(
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private router: Router,
    private loggedUser: LoggedUserService,
    private _profileSvc: ProfileService
  ) {
    this._profileSvc.showNabvar$.subscribe(show => this.showNavbar = show);
  }

  ngOnInit(): void {
    this.loadSize();
    this.goTo('/user/profile/editar-perfil');
    this.subscription = this.loggedUser.subscribe(user => {
      this.user = user;
    });
  }

  ngAfterViewInit(): void {
    this.resizeWidth();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.resizeSubscription$.unsubscribe();
  }

  // // This method allows to obtain by means of an observable the screen size
  resizeWidth() {
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe(evt => {
      if (evt.target['innerWidth'] > 768) {
        this.showNavbar = true;
        this.isMobile = false;
      } else {
        this.route.children.length === 0 ? this.showNavbar = true : this.showNavbar = false;
        this.isMobile = true;
      }
    });
  }

  // This method allows to obtain the screen size
  loadSize() {
    if (window.innerWidth > 768) {
      this.showNavbar = true;
      this.isMobile = false;
    } else {
      this.showNavbar = false;
      this.isMobile = true;
    }
  }

  // Go to X route
  goTo(route: string) {
    this.scrollTop();
    this.router.navigateByUrl(route);
    this.isMobile ? this.showNavbar = false : this.showNavbar = true;
  }

  // Logout user auth
  logout() {
    this.showProfile = false;
    this.loadingService.show();
    from(auth().signOut())
    .subscribe(() => {
      this.loadingService.hide();
      document.cookie = 'DRUPAL_SESSION=;path=/;SameSite=Strict;max-age=0;' + (window.location.hostname == 'localhost' ? '' : 'domain=tapit.com.co;');
      if (window.origin !== 'http://localhost:4200') {
        window.location.replace('/');
      }
    }, (error) => {
      console.error(error);
      this.loadingService.hide();
    });
  }

  // Scroll top page
  scrollTop() {
    $('html,body').animate({
        scrollTop: 0
    }, 'fast');
  }
}
