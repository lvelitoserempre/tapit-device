import {Injectable} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class IframeMessagingService {

  constructor(private configService: ConfigService) {
  }

  getParentData(): Observable<any> {
    return fromEvent(window, 'message')
      .pipe(filter((event: any) => event.data && event.data.channel === 'TAPIT' && event.data.action !== 'config'));
  }

  sendDataToParent(action: string, data) {
    if (window.parent) {
      window.parent.postMessage({
        channel: 'TAPIT',
        action,
        data
      }, window.location.ancestorOrigins.item(0))
    }
  }

  init() {
    fromEvent(window, 'message')
      .pipe(filter((event: any) => event.data && event.data.channel === 'TAPIT' && event.data.action === 'config'))
      .pipe(map(event => event.data.config))
      .subscribe(config => this.configService.setConfig(config));
  }
}
