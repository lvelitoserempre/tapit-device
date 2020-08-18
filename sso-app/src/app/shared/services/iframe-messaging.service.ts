import {Injectable} from '@angular/core';
import {fromEvent, Observable, of} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';
import {SSOConfigService} from '../../single-sign-on/sso-config.service';
import {AuthService} from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IframeMessagingService {
  private readonly CHANNEL = 'TAPIT';

  constructor(private configService: SSOConfigService, private authService: AuthService) {
  }

  listenActions(): Observable<any> {
    return fromEvent(window, 'message')
      .pipe(filter((event: any) => event.data && event.data.channel === this.CHANNEL && event.data.action !== 'config'))
      .pipe(map(event => event.data.action))
  }

// config

  sendDataToParent(action: string, data) {
    this.configService.getConfig().subscribe((config) => {
      const referrer = config.reference ? config.reference : document.referrer;
      if (window.parent) {
        window.parent.postMessage({
          channel: this.CHANNEL,
          action,
          data
        }, referrer)
      }
    });

  }

  init() {
    fromEvent(window, 'message')
      .pipe(filter((event: any) => event.data && event.data.channel === this.CHANNEL && event.data.action === 'config'))
      .pipe(map(event => event.data.config))
      .subscribe(config => this.configService.setConfig(config));

    this.listenActions()
      .pipe(switchMap(action => this.performAction(action)))
      .subscribe(result => {
      });
  }

  performAction(action: string): Observable<any> {
    switch (action) {
      case 'get-logged-user':
        return this.authService.getCurrentUser().pipe(map(user => this.sendDataToParent('set-logged-user', user)));
      case 'logout':
        return this.authService.logout();
      default:
        return of();
    }
  }
}
