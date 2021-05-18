import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProfileService} from '../profile/profile.service';
import {HistoryService} from './services/history.service';

// Components
import { ProfileComponent } from '../profile/profile.component';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

declare var $: any;
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  items: any[] = []; 
  isUserMaltas: boolean = false;
  observerTokenSubs: Subscription = null;
  loading: boolean = false;
  
  constructor(
    private router: Router,
    private ps: ProfileService,
    private _profileComponent: ProfileComponent,
    private _historySvc: HistoryService,
    private _authSvc: AuthService
  ) {}

  observerToken() {
    this.observerTokenSubs = this._authSvc.token$.subscribe(token => {
      this.getTransactions(token);
    });
  }

  ngOnInit() {
    this.loading = true;
    if (!this._authSvc.tokenCustom) {
      this.observerToken();
    } else {
      this.getTransactions(this._authSvc.tokenCustom);
    }
  }

  getTransactions(token: string) {
    this._historySvc.getTransactions(token).subscribe(async(res) => {
      this.items = await this.orderTransactions(res);
      this.loading = false;
      const findMaltas = this.items.find(item => item.originType === 'maltasMigration');
      (findMaltas) ? this.isUserMaltas = true : this.isUserMaltas = false;
    });
  }

  ngOnDestroy() {
    if (this.observerTokenSubs) {
      this.observerTokenSubs.unsubscribe();
    }
  }

  async orderTransactions(array: any[]) {
    if (array.length) {
      let arrayOrder: any[] = [];
      (array.find(res => res.originType === 'maltasMigration')) ? await arrayOrder.push(array.find(res => res.originType === 'maltasMigration')) : null;
      (array.find(res => res.originType === 'maltasExpiration')) ? await arrayOrder.push(array.find(res => res.originType === 'maltasExpiration')) : null;
      let otherItems = await array.filter(res => res.originType !== 'maltasMigration' && res.originType !== 'maltasExpiration')
      await otherItems.forEach(item => {
        arrayOrder.push(item);
      });
      return arrayOrder;
    } else {
      return [];
    }
  }

  // Go to profile route
  goBack() {
    this.scrollTop();
    this._profileComponent.showNavbar = true;
    setTimeout(() => {
      this.router.navigateByUrl('/user/profile');
      this.ps.next(true);
    }, 300);
  }

  // Scroll top page
  scrollTop() {
    $('html,body').animate({
        scrollTop: 0
    }, 'fast');
  }
}
