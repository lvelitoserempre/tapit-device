import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from './services/loader/loader.service';
import { UserAccountService } from './services/user-account/user-account.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
/**
 * Main component
 */
export class AppComponent {

    title = 'ABInBevWeb';

    userAccount = '';
    userInitials: Subject<string>;

    constructor(
        private authService: AuthService,
        private userAccountService: UserAccountService,
        private router: Router,
        private loaderService: LoaderService
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
                // this.router.navigate(['/login']);
                window.location.href = "https://www.cervezapoker.com";
            })
            .catch((error) => {
                this.loaderService.hide();
            });
    }
    gotoMap($event) {
        document.querySelector($event.target.getAttribute('data-scroll')).scrollIntoView({
            behavior: 'smooth'
        });
    }
    getName() {
       let data = JSON.parse(localStorage.getItem('userAccount'));
       let fullName = "";
       if(data !== null) {
        fullName = data.firstName+' '+data.lastName;
       }
       return fullName;
    }
}
