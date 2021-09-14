import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RemoteConfigService } from './services/remote-config.service';

@Injectable({
  providedIn: 'root'
})
export class RemoteConfigGuard implements CanActivate {
  constructor(
    private remoteConfig: RemoteConfigService
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    /* this is temporary manually done, the idea here is to guard routes by remote config automatically */
    if (state.url.indexOf('wallet') > -1) {
      return this.remoteConfig.getValue('wallet_enabled')
    } else if(state.url.indexOf('poc') > -1) {
      return this.remoteConfig.getValue('discover_enabled')
    } else {
      return true;
    }
  }
  
}
