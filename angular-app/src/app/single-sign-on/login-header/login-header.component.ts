import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.scss']
})
export class LoginHeaderComponent implements OnInit {
  @Input()
  isShowingBackButton: any;
  @Input()
  title: any;


  constructor(private router:Router) {
  }

  ngOnInit(): void {
  }

  closePopup() {
  }

  navigateBack() {
    this.router.navigateByUrl('/sso/login');
  }
}
