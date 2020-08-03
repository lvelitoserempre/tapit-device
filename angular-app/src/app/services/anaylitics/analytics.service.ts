import {Injectable} from '@angular/core';

declare var dataLayer;
declare var ga;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {


  constructor() {
  }

  /*
    sendUserId() {
      this.userService.getCurrentUser().subscribe(user => {
        if (user) {
          dataLayer.push({event: 'userId', uid: user.id});
        }
      });
    }*/

  sendCustomEvent(event) {
    ga('send', event);
  }
}
