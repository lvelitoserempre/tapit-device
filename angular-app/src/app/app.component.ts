import {Component, OnInit} from '@angular/core';
import {UserService} from './user/user.service';
import {auth, User} from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    auth().onAuthStateChanged((user: User) => {
      if (user) {
        this.userService.setCurrentUser(user.uid);
      } else {
        this.userService.setCurrentUser(null);
      }
    });
  }
}
