import {Injectable} from '@angular/core';
import {fromEvent} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {SSOConfigService} from '../../single-sign-on/sso-config.service';
import {AuthService} from '../../auth/auth.service';
import SSOConfig from '../../single-sign-on/sso-config';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IframeMessagingService {
  private readonly CHANNEL = 'TAPIT';

  constructor(private configService: SSOConfigService, private authService: AuthService, private router: Router) {
  }

  sendDataToParent(action: string, data) {
    this.configService.getConfig()
      .subscribe((config) => {
        const referrer = config.reference || document.referrer;

        if (window.parent) {
          window.parent.postMessage({
            channel: this.CHANNEL,
            action,
            data
          }, referrer);
        }
      });
  }

  listenWindowMessages() {
    fromEvent(window, 'message')
      .pipe(filter((event: any) => event.data && event.data.channel === this.CHANNEL))
      .pipe(map(event => this.performAction(event.data.action, (event.data.data || event.data.config)))) //TODO deprecate and delete the config variable
      .subscribe()
  }

  private performAction(action: string, data?) {
    switch (action) {
      case 'config':
        if (this.isConfigValid(data)) {
          this.configService.setConfig(data);
        }
        break;

      case 'get-logged-user':
        this.authService.getCurrentUser()
          .pipe(map(user => this.sendDataToParent('set-logged-user', user))).subscribe();
        break;

      case 'logout':
        this.authService.logout().subscribe();
        break;

      case 'navigateTo':
        this.router.navigateByUrl(data);
        break;

      default:
        console.error('Action ' + action + ' does not exist');
    }
  }

  private isConfigValid(config: SSOConfig) {
    return true;
  }
}
