import {Component, OnInit} from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import {NavigationEnd, Router} from '@angular/router';
import { LoaderService } from './services/loader/loader.service';
import { UserAccountService } from './services/user-account/user-account.service';
import { Subject } from 'rxjs';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
/**
 * Main component
 */
export class AppComponent implements OnInit {

    title = 'ABInBevWeb';

    userAccount = '';
    userInitials: Subject<string>;

    constructor(
        private authService: AuthService,
        private userAccountService: UserAccountService,
        private router: Router,
        private loaderService: LoaderService,
        private gtmService: GoogleTagManagerService,
    ) {
        this.authService.listenUserStateChanges();
        this.userAccountService.listenUserAccountChanges();
        this.userInitials = this.userAccountService.userInitials;
    }

    /**
     * Getter checking whether the user is logged in
     */
    get isLoggedIn(): boolean { return this.authService.isLoggedIn; }

    /**
     * Navigates to the provided route
     * @param route The route
     */
    navigateTo(route: string) {
        this.router.navigate([route]);
    }

    /**
     * Logs out the user
     */
    logout() {
        this.loaderService.show();
        this.authService.logout()
            .then(() => {
                this.loaderService.hide();
                localStorage.clear();
                this.router.navigate(['/login']);
            })
            .catch((error) => {
                this.loaderService.hide();
            });
    }

    ngOnInit() {
      // push GTM data layer for every visited page
      this.router.events.forEach(item => {
        if (item instanceof NavigationEnd) {
          const gtmTag = {
            event: 'page',
            pageName: item.url
          };
          this.gtmService.pushTag(gtmTag);
        }
      });
    }
}
