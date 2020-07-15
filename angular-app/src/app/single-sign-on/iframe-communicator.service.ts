import {Injectable} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {filter, map, shareReplay} from 'rxjs/operators';
import LoginConfig from './login.config';

@Injectable({
  providedIn: 'root'
})
export class IframeCommunicatorService {
  config: Observable<LoginConfig>;

  constructor() {
    this.config = fromEvent(window, 'message')
      .pipe(filter((event: any) => event.data && event.data.channel === 'TAPIT' && event.data.action === 'config'))
      .pipe(map(event => event.data.config))
      .pipe(shareReplay(1));
  }

  setUpCommunicationListener() {
    fromEvent(window, 'message')
      .pipe(filter((event: any) => event.data && event.data.channel === 'TAPIT' && event.data.action === 'config'))
      .subscribe(event => {
        this.config = event.data.config;
      });
  }

  getParentData(): Observable<any> {
    return fromEvent(window, 'message')
      .pipe(filter((event: any) => event.data && event.data.channel === 'TAPIT' && event.data.action !== 'config'));
  }

  sendDataToParent(data) {
    if (window.parent) {
      window.parent.postMessage(data, window.parent.origin)
    }
  }
}
