import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile/profile.service';
import { Router } from '@angular/router';

// Helpers
import { scrollTop } from '../../helpers/scrollTop.helper';

// Components
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  constructor(
    private router: Router,
    private ps: ProfileService,
    private _profileComponent: ProfileComponent
  ) { }

  ngOnInit(): void {
  }

  // Go back to profile
  goBack() {
    scrollTop();
    this._profileComponent.showNavbar = true;
    setTimeout(() => {
      this.router.navigateByUrl('/user/profile');
      this.ps.next(true);
    }, 300);
  }
}