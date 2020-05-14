import {Injectable} from '@angular/core';
import {UserAuthenticationService} from '../../user-authentication/user-authentication-service/user-authentication.service';

declare var dataLayer;
declare var ga;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {


  constructor(private userService: UserAuthenticationService) {
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
