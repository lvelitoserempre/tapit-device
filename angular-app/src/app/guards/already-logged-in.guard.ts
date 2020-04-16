import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AlreadyLoggedInGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    /**
     * Check whether the user is logged in. If true, redirects to the home screen
     * @param route Contains the information about a route associated with a loaded component.
     * @param state The state of the router at a moment in time.
     */
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (this.authService.isLoggedIn) {
            this.router.navigate(['/home']);
        }

        return true;
    }

}
