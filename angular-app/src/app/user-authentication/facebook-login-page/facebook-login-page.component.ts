import {Component, OnInit} from '@angular/core';
import {auth} from 'firebase';
import {from} from 'rxjs';
import {UserAuthenticationService} from '../user-authentication-service/user-authentication.service';
import {Router} from '@angular/router';
import {LoaderService} from '../../loader/loader-service/loader.service';
import {DialogService} from '../../dialog/dialog-service/dialog.service';
import {mergeMap} from 'rxjs/operators';
import FacebookAuthProvider = auth.FacebookAuthProvider;

@Component({
  selector: 'app-facebook-login-page',
  templateUrl: './facebook-login-page.component.html',
  styleUrls: ['./facebook-login-page.component.scss']
})
export class FacebookLoginPageComponent implements OnInit {

  constructor(private userService: UserAuthenticationService,
              private router: Router,
              private loaderService: LoaderService,
              private dialogService: DialogService) {
  }

  ngOnInit(): void {
  }

  login() {
    const facebookAuthProvider = new FacebookAuthProvider();
    facebookAuthProvider.addScope('user_birthday');

    from(auth().signInWithPopup(facebookAuthProvider))
      .pipe(mergeMap((facebookResponse) => {
        console.log(facebookResponse)
        const userData = this.parseUserData(facebookResponse);
        return this.userService.checkUser(userData);
      }))
      .subscribe(res => {
          this.loaderService.hide();
          this.router.navigateByUrl('');
        },
        error => {
          this.loaderService.hide();
          this.dialogService.manageError(error);
        });
  }

  private parseUserData(facebookResponse) {
    return {
      email: facebookResponse.additionalUserInfo.profile.email,
      firstName: facebookResponse.additionalUserInfo.profile.first_name,
      lastName: facebookResponse.additionalUserInfo.profile.last_name,
      birthDate: (new Date(facebookResponse.additionalUserInfo.profile.birthday)).toISOString(),
      origin: 'pola'
    };
  }
}
