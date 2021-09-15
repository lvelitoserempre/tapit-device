import {Component, OnDestroy} from '@angular/core';
import {of, Subscription} from 'rxjs';
import {environment} from '../../environments/environment';
import {UserAccount} from '../user/user-account';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { DataRepoService } from '../services/data-repo.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  user: UserAccount;
  marketUrl = environment.marketUrl;
  showLoginButton = false;
  showMicrogifting = false;
  total: any;
  showCuponeraButton$: boolean = false;
  repoSubs: Subscription;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private dataRepoService: DataRepoService
  ) {
    this.angularFireAuth.user
    .pipe(switchMap(user => {
      return user ? this.angularFirestore.collection('user_account_tap').doc(user.uid).valueChanges() : of(null);
    }))
    .subscribe(user => {
      this.user = user;
      this.showLoginButton = !this.user;
    })
    this.repoSubs = this.dataRepoService.getShowWallet()
    .subscribe((data:  any) => {
      this.showCuponeraButton$ = data;
    })
  }

  setMenu(event: any) {
    if (event.target.checked) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }

  loginCloseMenu() {
    document.getElementById('toggleMenu').click()
  }

  ngOnDestroy(): void {
    this.repoSubs.unsubscribe();
  }

  ssoOpen():void {
    ssoApp.showApp();
  }
}
