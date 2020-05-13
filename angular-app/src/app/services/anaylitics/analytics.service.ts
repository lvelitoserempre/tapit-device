import {Injectable} from '@angular/core';
import {AuthService} from '../../user/auth.service';

declare var dataLayer;
declare var ga;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {


  constructor(private userService: AuthService) {
  }

  sendUserId() {
    this.userService.getCurrentUser().subscribe(user => {
      if (user) {
        dataLayer.push({event: 'userId', uid: user.id});
      }
    });
  }

  sendCustomEvent(event) {
    ga('send', event);
  }
}
