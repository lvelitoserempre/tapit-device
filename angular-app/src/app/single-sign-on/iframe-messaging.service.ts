import {Injectable} from '@angular/core';
import {fromEvent, Observable, of} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';
import {ConfigService} from './config.service';
import {AuthService} from '../user/user-authentication/user-authentication-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IframeMessagingService {
  private readonly CHANNEL = 'TAPIT';

  constructor(private configService: ConfigService, private authService: AuthService) {
  }

  listenActions(): Observable<any> {
    return fromEvent(window, 'message')
      .pipe(filter((event: any) => event.data && event.data.channel === this.CHANNEL && event.data.action !== 'config'))
      .pipe(map(event => event.data.action))
  }

  sendDataToParent(action: string, data) {
    if (window.parent) {
      window.parent.postMessage({
        channel: this.CHANNEL,
        action,
        data
      }, window.location.ancestorOrigins.item(0))
    }
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
      default:
        return of();
    }
  }
}
