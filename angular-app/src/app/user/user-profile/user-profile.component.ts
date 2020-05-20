import {Component, OnInit} from '@angular/core';
import {UserAccount} from '../../models/user-account.model';
import {UserAuthenticationService} from '../user-authentication/user-authentication-service/user-authentication.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: UserAccount;

  constructor(private authService: UserAuthenticationService) {
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => this.user = user);
  }

}
